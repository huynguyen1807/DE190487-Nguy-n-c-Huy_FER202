import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card, Modal } from 'react-bootstrap';
import { useAuthDispatch } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuthDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setError('');
    setLoading(true);
    
    const res = await login(formData.username, formData.password);
    setLoading(false);
    
    if (res.success) {
      setWelcomeUser(res.user.name);
      setShowWelcome(true);
      // Auto redirect after 3 seconds
      setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
    } else {
      setError(res.message || 'Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <>
      <Container className="mt-5 d-flex justify-content-center">
        <Card style={{ maxWidth: 480, width: '100%' }}>
          <Card.Header>
            <h4 className="mb-0">🎬 Đăng nhập hệ thống</h4>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Tên đăng nhập</Form.Label>
                <Form.Control 
                  name="username"
                  value={formData.username} 
                  onChange={handleChange} 
                  placeholder="Nhập tên đăng nhập"
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control 
                  type="password"
                  name="password"
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Nhập mật khẩu"
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-grid">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </div>
            </Form>
            <div className="mt-3">
              <small className="text-muted">
                <strong>Tài khoản demo:</strong><br/>
                <strong>admin / admin123</strong> - Quản trị viên (Có thể thêm/sửa/xóa phim)<br/>
                <strong>user / user123</strong> - Người dùng (Chỉ xem danh sách phim)
              </small>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* Welcome Modal */}
      <Modal show={showWelcome} centered>
        <Modal.Header>
          <Modal.Title className="text-success">
            <i className="fas fa-check-circle me-2"></i>
            Đăng nhập thành công!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h5>Chào mừng, {welcomeUser}!</h5>
            <p className="text-muted">Bạn sẽ được chuyển đến trang danh sách phim...</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowWelcome(false)}>
            Tiếp tục
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
