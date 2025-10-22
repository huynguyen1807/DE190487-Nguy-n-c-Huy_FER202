import React, { useReducer } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

// 1. Khởi tạo trạng thái ban đầu
const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
  user: null
};

// 2. Định nghĩa hàm reducer
function loginReducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { 
        ...state, 
        username: action.payload,
        error: '' // Clear error when user types
      };
    case 'SET_PASSWORD':
      return { 
        ...state, 
        password: action.payload,
        error: '' // Clear error when user types
      };
    case 'LOGIN_START':
      return { 
        ...state, 
        isLoading: true,
        error: ''
      };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
        password: '' // Clear password for security
      };
    case 'LOGIN_ERROR':
      return { 
        ...state, 
        isLoading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return initialState;
    case 'CLEAR_ERROR':
      return { 
        ...state, 
        error: ''
      };
    default:
      return state;
  }
}

function LoginForm() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(loginReducer, initialState);

  // Action handlers
  const handleUsernameChange = (e) => {
    dispatch({ type: 'SET_USERNAME', payload: e.target.value });
  };

  const handlePasswordChange = (e) => {
    dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!state.username.trim()) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Vui lòng nhập tên đăng nhập!' });
      return;
    }
    if (!state.password) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Vui lòng nhập mật khẩu!' });
      return;
    }

    dispatch({ type: 'LOGIN_START' });

    // Simulate API call
    setTimeout(() => {
      // Simple validation (demo purposes)
      if (state.username === 'admin' && state.password === '123456') {
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: { 
            username: state.username,
            loginTime: new Date().toLocaleString()
          }
        });
      } else {
        dispatch({ 
          type: 'LOGIN_ERROR', 
          payload: 'Tên đăng nhập hoặc mật khẩu không đúng!' 
        });
      }
    }, 1500); // Simulate network delay
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Render logged in state
  if (state.isLoggedIn) {
    return (
      <Card className="p-4">
        <Card.Body className="text-center">
          <h2 className="text-success mb-4">Đăng nhập thành công! 🎉</h2>
          <div className="mb-4">
            <h4>Chào mừng, {state.user.username}!</h4>
            <p className="text-muted">Thời gian đăng nhập: {state.user.loginTime}</p>
          </div>
          <Button variant="outline-danger" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Card.Body>
      </Card>
    );
  }

  // Render login form
  return (
    <Card className="p-4">
      <Card.Body>
        <h2 className="text-center mb-4">Đăng Nhập</h2>
        
        {state.error && (
          <Alert variant="danger" dismissible onClose={() => dispatch({ type: 'CLEAR_ERROR' })}>
            {state.error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={state.username}
              onChange={handleUsernameChange}
              disabled={state.isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu"
              value={state.password}
              onChange={handlePasswordChange}
              disabled={state.isLoading}
            />
          </Form.Group>

          <div className="d-grid">
            <Button 
              variant="primary" 
              type="submit" 
              disabled={state.isLoading}
              size="lg"
            >
              {state.isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </div>
        </Form>

        <div className="mt-3 text-center">
          <small className="text-muted">
            Demo: username = "admin", password = "123456"
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LoginForm;