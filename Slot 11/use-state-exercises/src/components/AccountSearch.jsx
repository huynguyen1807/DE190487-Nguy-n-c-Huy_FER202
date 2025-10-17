import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { accounts } from '../data';

function AccountSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredAccounts = accounts.filter(acc =>
    acc.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Tìm kiếm Account theo Username</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Nhập username để tìm kiếm..."
        style={{
          width: '100%',
          maxWidth: 400,
          margin: '0 auto 24px',
          display: 'block',
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1.5px solid #90caf9',
          fontSize: 16,
          outline: 'none',
        }}
      />
      <Row className="justify-content-center">
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map(acc => (
            <Col md={4} key={acc.id} className="mb-4">
              <Card style={{ height: '100%' }}>
                <Card.Img 
                  variant="top" 
                  src={acc.avatar} 
                  style={{ height: 200, objectFit: 'cover' }} 
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">{acc.username}</Card.Title>
                  <Card.Text className="mb-2">
                    <strong>ID:</strong> {acc.id}
                  </Card.Text>
                  <Card.Text className="mb-2">
                    <strong>Password:</strong> {acc.password}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={8} className="text-center">
            <Card>
              <Card.Body>
                <Card.Text style={{ color: '#888', fontSize: '18px' }}>
                  Không tìm thấy kết quả
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default AccountSearch;
