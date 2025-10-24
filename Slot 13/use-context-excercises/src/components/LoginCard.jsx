//LoginCard.jsx - Component card form đăng nhập
import React from 'react';
import { Button, Form, Alert, Container, Card } from 'react-bootstrap';

function LoginCard({ 
  username, 
  password, 
  errors, 
  isSubmitting, 
  error, 
  onInputChange, 
  onSubmit 
}) {
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

          <Form onSubmit={onSubmit}>
            {/* Trường Username */}
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => onInputChange('username', e.target.value)}
                isInvalid={!!errors.username}
                placeholder="Nhập tên đăng nhập"
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Trường Password */}
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => onInputChange('password', e.target.value)}
                isInvalid={!!errors.password}
                placeholder="Nhập mật khẩu"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Button Submit */}
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="w-100"
            >
              {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
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

export default LoginCard;
