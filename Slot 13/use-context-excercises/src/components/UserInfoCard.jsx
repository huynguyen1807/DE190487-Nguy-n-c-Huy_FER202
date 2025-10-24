//UserInfoCard.jsx - Component hiển thị thông tin người dùng sau khi đăng nhập
import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';

function UserInfoCard({ user, onLogout }) {
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
            onClick={onLogout}
            className="w-100"
          >
            Đăng xuất
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserInfoCard;
