//LoginForm.jsx - Form đăng nhập sử dụng useReducer và AuthContext
import React, { useReducer } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserInfoCard from './UserInfoCard';
import LoginCard from './LoginCard';

// 1. Khởi tạo trạng thái ban đầu cho form
const initialState = {
  username: '',
  password: '',
  errors: {},
  isSubmitting: false
};

// 2. Định nghĩa hàm reducer để quản lý trạng thái form
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: '' // Xóa lỗi khi người dùng nhập
        }
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

function LoginForm() {
  // 3. Sử dụng useReducer để quản lý trạng thái form
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  // Sử dụng AuthContext để lấy các hàm authentication
  const { login, error, isAuthenticated, user, logout } = useAuth();

  // Hàm validation form
  const validateForm = () => {
    const errors = {};

    // Validate username
    if (!state.username.trim()) {
      errors.username = 'Tên đăng nhập không được để trống';
    } else if (state.username.length < 3) {
      errors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
    }

    // Validate password
    if (!state.password.trim()) {
      errors.password = 'Mật khẩu không được để trống';
    } else if (state.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    return errors;
  };

  // Xử lý khi người dùng nhập dữ liệu
  const handleInputChange = (field, value) => {
    dispatch({
      type: 'SET_FIELD',
      field: field,
      value: value
    });
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Bắt đầu quá trình submit
    dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });

    // Validate form
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
      return;
    }

    // Thực hiện đăng nhập
    const loginSuccess = login(state.username, state.password);
    
    if (loginSuccess) {
      // Reset form sau khi đăng nhập thành công
      dispatch({ type: 'RESET_FORM' });
    }

    dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    logout();
    dispatch({ type: 'RESET_FORM' });
  };

  // Nếu đã đăng nhập, hiển thị thông tin người dùng
  if (isAuthenticated && user) {
    return <UserInfoCard user={user} onLogout={handleLogout} />;
  }

  // Form đăng nhập
  return (
    <LoginCard
      username={state.username}
      password={state.password}
      errors={state.errors}
      isSubmitting={state.isSubmitting}
      error={error}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  );
}

export default LoginForm;