import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function AddressForm({ formData, errors, onChange }) {
  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <i className="bi bi-geo-alt me-2" style={{ fontSize: '1.5rem' }}></i>
        <h4 className="mb-0">Address Information</h4>
      </div>
      
      <Row className="g-3">
        <Col md={12}>
          <Form.Label>Street Address *</Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={formData.street || ''}
            onChange={onChange}
            isInvalid={errors.street}
            placeholder="Enter street address"
          />
          <Form.Control.Feedback type="invalid">
            Street address is required
          </Form.Control.Feedback>
        </Col>

        <Col md={6}>
          <Form.Label>City *</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city || ''}
            onChange={onChange}
            isInvalid={errors.city}
            placeholder="Enter city"
          />
          <Form.Control.Feedback type="invalid">
            City is required
          </Form.Control.Feedback>
        </Col>

        <Col md={6}>
          <Form.Label>Country *</Form.Label>
          <Form.Select
            name="country"
            value={formData.country || ''}
            onChange={onChange}
            isInvalid={errors.country}
          >
            <option value="">Select Country</option>
            <option value="VN">Vietnam</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="JP">Japan</option>
            <option value="KR">South Korea</option>
            <option value="AU">Australia</option>
            <option value="CA">Canada</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="SG">Singapore</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Country is required
          </Form.Control.Feedback>
        </Col>

        <Col md={6}>
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            name="zipCode"
            value={formData.zipCode || ''}
            onChange={onChange}
            placeholder="Enter zip code"
          />
        </Col>
      </Row>
    </div>
  );
}