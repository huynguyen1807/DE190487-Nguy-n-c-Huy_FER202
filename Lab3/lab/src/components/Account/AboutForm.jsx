import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function AboutForm({ formData, errors, onChange }) {
  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <i className="bi bi-person-circle me-2" style={{ fontSize: '1.5rem' }}></i>
        <h4 className="mb-0">About Information</h4>
      </div>
      
      <Row className="g-3">
        <Col md={6}>
          <Form.Label>First Name *</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName || ''}
            onChange={onChange}
            isInvalid={errors.firstName}
            placeholder="Enter first name"
          />
          <Form.Control.Feedback type="invalid">
            First name is required
          </Form.Control.Feedback>
        </Col>

        <Col md={6}>
          <Form.Label>Last Name *</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName || ''}
            onChange={onChange}
            isInvalid={errors.lastName}
            placeholder="Enter last name"
          />
          <Form.Control.Feedback type="invalid">
            Last name is required
          </Form.Control.Feedback>
        </Col>

        <Col md={6}>
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={onChange}
            isInvalid={errors.email}
            placeholder="Enter email address"
          />
          <Form.Control.Feedback type="invalid">
            Valid email is required
          </Form.Control.Feedback>
        </Col>

        <Col md={6}>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={onChange}
            placeholder="Enter phone number"
          />
        </Col>

        <Col md={6}>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={onChange}
            min="1"
            max="120"
            placeholder="Enter age"
          />
        </Col>

        <Col md={6}>
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            onChange={onChange}
            accept="image/*"
          />
        </Col>
      </Row>
    </div>
  );
}