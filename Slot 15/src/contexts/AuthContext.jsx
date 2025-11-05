import React, { createContext, useContext, useState, useEffect } from 'react';
import movieApi from '../api/movieAPI';

const AuthStateContext = createContext(null);
const AuthDispatchContext = createContext(null);

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (username, password) => {
    try {
      // json-server supports query params to filter
      const res = await movieApi.get(`/accounts?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
      if (res.data && res.data.length > 0) {
        const account = res.data[0];
        const userData = { 
          id: account.id, 
          username: account.username, 
          name: account.name,
          role: account.role 
        };
        setUser(userData);
        return { success: true, user: userData };
      }
      return { success: false, message: 'Tài khoản hoặc mật khẩu không đúng' };
    } catch (error) {
      console.error('Lỗi khi login:', error);
      return { success: false, message: 'Lỗi khi kết nối server' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthStateContext.Provider value={{ user }}>
      <AuthDispatchContext.Provider value={{ login, logout }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
