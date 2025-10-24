//LoginForm.jsx - Form đăng nhập sử dụng useReducer và AuthContext
import React, { useReducer } from 'react';
import { Button, Form, Alert, Container, Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

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
    return (
      <Container className="mt-5">
        <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
          <Card.Body>
            <Card.Title className="text-center">Đăng nhập thành công!</Card.Title>
            <div className="mb-3">
              <strong>Chào mừng, {user.username}!</strong>
            </div>
            <div className="mb-3">
              <p>Email: {user.email}</p>
              <p>Vai trò: {user.role}</p>
              <p>Trạng thái: {user.status}</p>
            </div>
            <Button 
              variant="danger" 
              onClick={handleLogout}
              className="w-100"
            >
              Đăng xuất
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // Form đăng nhập
  return (
    <Container className="mt-5">
      <Card style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Đăng nhập</Card.Title>
          
          {/* Hiển thị lỗi từ AuthContext */}
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Trường Username */}
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                value={state.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                isInvalid={!!state.errors.username}
                placeholder="Nhập tên đăng nhập"
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Trường Password */}
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                value={state.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                isInvalid={!!state.errors.password}
                placeholder="Nhập mật khẩu"
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Button Submit */}
            <Button
              variant="primary"
              type="submit"
              disabled={state.isSubmitting}
              className="w-100"
            >
              {state.isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </Form>

          {/* Thông tin tài khoản test */}
          <div className="mt-4">
            <small className="text-muted">
              <strong>Tài khoản test:</strong><br/>
              Username: admin<br/>
              Password: 123456<br/>
              <em>(Chỉ admin mới được phép đăng nhập)</em>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginForm;