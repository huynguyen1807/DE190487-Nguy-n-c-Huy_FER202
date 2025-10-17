import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast } from 'react-bootstrap';

function validateUsername(username) {
  const trimmed = username.trim();
  // Username ≥ 3 ký tự, chỉ chữ, số, _ hoặc ., không khoảng trắng đầu/cuối
  return trimmed.length >= 3 && /^[A-Za-z0-9_.]+$/.test(trimmed) && trimmed === username;
}

function validateEmail(email) {
  // Email đúng định dạng
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function validatePassword(password) {
  // Password: ≥ 8 ký tự, có chữ hoa, chữ thường, chữ số, ký tự đặc biệt
  return password.length >= 8 &&
         /[a-z]/.test(password) &&
         /[A-Z]/.test(password) &&
         /\d/.test(password) &&
         /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
}

function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    let error = '';
    if (name === 'username') {
      if (!validateUsername(value)) {
        error = 'Username ≥ 3 ký tự (chỉ chữ, số, _ hoặc .), không khoảng trắng đầu/cuối';
      }
    }
    if (name === 'email') {
      if (!validateEmail(value)) {
        error = 'Email không đúng định dạng';
      }
    }
    if (name === 'password') {
      if (!validatePassword(value)) {
        error = 'Password ≥ 8 ký tự, có chữ hoa, chữ thường, chữ số, ký tự đặc biệt';
      }
      // Kiểm tra lại confirm password khi password thay đổi
      if (form.confirm && value !== form.confirm) {
        setErrors((prev) => ({ ...prev, confirm: 'Confirm phải khớp password' }));
      } else if (form.confirm && value === form.confirm) {
        setErrors((prev) => {
          const { confirm, ...rest } = prev;
          return rest;
        });
      }
    }
    if (name === 'confirm') {
      if (value !== form.password) {
        error = 'Confirm phải khớp password';
      }
    }
    
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const isValid =
    validateUsername(form.username) &&
    validateEmail(form.email) &&
    validatePassword(form.password) &&
    form.confirm === form.password &&
    Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setForm({ username: '', email: '', password: '', confirm: '' });
    setErrors({});
    setShowModal(false);
    setShowToast(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Đăng ký tài khoản</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Nhập username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Nhập email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Nhập password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="confirm" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    isInvalid={!!errors.confirm}
                    placeholder="Nhập lại password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" type="submit" disabled={!isValid}>
                    Submit
                  </Button>
                  <Button variant="secondary" type="button" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
        style={{ position: 'fixed', top: 20, right: 20, minWidth: 200 }}
      >
        <Toast.Header>
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>
      <Modal show={showModal} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title className="text-success">Đăng ký thành công!</Card.Title>
              <Card.Text><strong>Username:</strong> {form.username}</Card.Text>
              <Card.Text><strong>Email:</strong> {form.email}</Card.Text>
              <Card.Text><strong>Password:</strong> {"*".repeat(form.password.length)}</Card.Text>
              <Card.Text className="text-muted">
                Thông tin đã được submit thành công!
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegisterForm;
