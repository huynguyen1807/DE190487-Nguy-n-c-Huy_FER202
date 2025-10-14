import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

export default function AccountForm({ formData, errors, onChange }) {
  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <i className="bi bi-lock me-2" style={{ fontSize: '1.5rem' }}></i>
        <h4 className="mb-0">Account Information</h4>
      </div>
      
      <Row className="g-3">
        <Col md={6}>
          <Form.Label>Username *</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-person"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              name="username"
              value={formData.username || ''}
              onChange={onChange}
              isInvalid={errors.username}
              placeholder="Enter username"
            />
            <Form.Control.Feedback type="invalid">
              Username is required
            </Form.Control.Feedback>
          </InputGroup>
        </Col>

        <Col md={6}>
          <Form.Label>Password *</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-lock"></i>
            </InputGroup.Text>
            <Form.Control
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={onChange}
              isInvalid={errors.password}
              placeholder="Enter password"
            />
            <Form.Control.Feedback type="invalid">
              Password is required
            </Form.Control.Feedback>
          </InputGroup>
        </Col>

        <Col md={6}>
          <Form.Label>Confirm Password *</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-lock-fill"></i>
            </InputGroup.Text>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword || ''}
              onChange={onChange}
              isInvalid={errors.confirmPassword}
              placeholder="Confirm password"
            />
            <Form.Control.Feedback type="invalid">
              Passwords must match
            </Form.Control.Feedback>
          </InputGroup>
        </Col>

        <Col md={6}>
          <Form.Label>Secret Question *</Form.Label>
          <Form.Select
            name="secretQuestion"
            value={formData.secretQuestion || ''}
            onChange={onChange}
            isInvalid={errors.secretQuestion}
          >
            <option value="">Choose a security question</option>
            <option value="pet">What was your first pet's name?</option>
            <option value="school">What elementary school did you attend?</option>
            <option value="city">What city were you born in?</option>
            <option value="mother">What is your mother's maiden name?</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Secret question is required
          </Form.Control.Feedback>
        </Col>

        <Col md={12}>
          <Form.Label>Answer *</Form.Label>
          <Form.Control
            type="text"
            name="secretAnswer"
            value={formData.secretAnswer || ''}
            onChange={onChange}
            isInvalid={errors.secretAnswer}
            placeholder="Enter your answer"
          />
          <Form.Control.Feedback type="invalid">
            Answer is required
          </Form.Control.Feedback>
        </Col>
      </Row>
    </div>
  );
}