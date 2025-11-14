//AuthContext.jsx quản lý xác thực người dùng bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialAuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
};

// 3. Tạo hàm reduce để quản lý các hành động liên quan đến xác thực
const authReducer = (state, action) => {
    switch (action.type) { 
        case 'LOGIN_START':
            return { ...state, isLoading: true, error: null };
        case 'LOGIN_SUCCESS':
            // Lưu user vào Local Storage
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, isLoading: false, isAuthenticated: true, user: action.payload, error: null };
        case 'LOGIN_FAILURE':
            // Lỗi từ server/invalid credentials
            return { ...state, isLoading: false, error: action.payload };
        case 'LOGOUT':
            // Xóa user khỏi Local Storage
            localStorage.removeItem('user');
            // Trở về trạng thái ban đầu, nhưng giữ lại các trường hợp ngoại lệ nếu có
            return { ...initialAuthState, isAuthenticated: false, user: null };
        case 'CLEAR_ERROR':
            // Thêm action này để LoginForm có thể xóa lỗi Auth khi người dùng nhập
            return { ...state, error: null };
        case 'RESTORE_SESSION':
            // Khôi phục session từ localStorage
            return { ...state, isAuthenticated: true, user: action.payload };
        default:
            return state;
    }
};

// 4. Tạo AuthProvider để cung cấp Context cho các component con
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    // Khôi phục session từ localStorage khi component mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                dispatch({ type: 'RESTORE_SESSION', payload: user });
            } catch (error) {
                // Nếu có lỗi parse JSON, xóa data từ localStorage
                localStorage.removeItem('user');
            }
        }
    }, []);

    // Hàm action để xóa lỗi
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // Hàm login nhận usernameOrEmail (identifier) và password
    const login = async ({ usernameOrEmail, password }) => {
        dispatch({ type: 'LOGIN_START' });
        
        try {
            // 1. Gọi API để đăng nhập và lấy thông tin user từ file db.json
            const accounts = await api.getUsers(); // Giả định getUsers() lấy tất cả users
            
            // 2. SỬA LỖI: Kiểm tra thông tin đăng nhập bằng username HOẶC email (identifier)
            const user = accounts.find(
                (acc) =>
                    (acc.username === usernameOrEmail || (acc.email && acc.email === usernameOrEmail)) &&
                    acc.password === password
            );

            // 3. Cập nhật trạng thái dựa trên kết quả đăng nhập
            if (user) { 
                // Yêu cầu: chỉ cho phép user có role 'admin' và status 'active' đăng nhập vào dashboard
                if (user.status && user.status.toLowerCase() !== 'active') {
                    const msg = 'Tài khoản bị khóa hoặc không hoạt động.';
                    dispatch({ type: 'LOGIN_FAILURE', payload: msg });
                    return { success: false, error: msg };
                }

                if (user.role && user.role.toLowerCase() !== 'admin') {
                    const msg = 'Bạn không có quyền truy cập. Chỉ admin được phép vào Dashboard.';
                    dispatch({ type: 'LOGIN_FAILURE', payload: msg });
                    return { success: false, error: msg };
                }

                // Nếu đạt yêu cầu role + status thì cho phép đăng nhập
                dispatch({ type: 'LOGIN_SUCCESS', payload: user });
                // Trả về kết quả thành công cho LoginForm
                return { success: true, user };
            } else { 
                // Đăng nhập thất bại (Invalid username/email hoặc password)
                const errorMessage = 'Invalid username/email or password!';
                dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            // Lỗi mạng hoặc lỗi không xác định từ API
            const errorMessage = error.message || 'Login failed due to a network error.';
            dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    // 4. Cung cấp trực tiếp các giá trị cần thiết qua Context value
    const contextValue = {
        // Trạng thái từ Reducer
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.isLoading,
        error: state.error,
        
        // Actions
        login,
        logout,
        clearError, // Thêm hàm clearError để LoginForm có thể sử dụng
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => useContext(AuthContext);