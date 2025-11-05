import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Header = () => {
  const { user } = useAuthState();
  const { logout } = useAuthDispatch();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Movies Manager</Navbar.Brand>
        <Nav className="ms-auto">
          {user ? (
            <>
              <Navbar.Text className="me-3">
                Xin chào, <strong>{user.name}</strong> 
                <small className="ms-2 text-muted">({user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'})</small>
              </Navbar.Text>
              <Button variant="outline-secondary" size="sm" onClick={logout}>Đăng xuất</Button>
            </>
          ) : (
            <Navbar.Text className="me-3">Chưa đăng nhập</Navbar.Text>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
