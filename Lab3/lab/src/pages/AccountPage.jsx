import React, { useState } from 'react';
import { Container, Card, ProgressBar, Button, Row, Col } from 'react-bootstrap';
import AboutForm from '../components/Account/AboutForm';
import AccountForm from '../components/Account/AccountForm';
import AddressForm from '../components/Account/AddressForm';

export default function AccountPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // About Form
        if (!formData.firstName?.trim()) newErrors.firstName = true;
        if (!formData.lastName?.trim()) newErrors.lastName = true;
        if (!formData.email?.trim() || !formData.email?.includes('@')) newErrors.email = true;
        break;
        
      case 2: // Account Form
        if (!formData.username?.trim()) newErrors.username = true;
        if (!formData.password?.trim()) newErrors.password = true;
        if (!formData.confirmPassword?.trim() || formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = true;
        }
        if (!formData.secretQuestion?.trim()) newErrors.secretQuestion = true;
        if (!formData.secretAnswer?.trim()) newErrors.secretAnswer = true;
        break;
        
      case 3: // Address Form
        if (!formData.street?.trim()) newErrors.street = true;
        if (!formData.city?.trim()) newErrors.city = true;
        if (!formData.country?.trim()) newErrors.country = true;
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleFinish = () => {
    if (validateStep(currentStep)) {
      alert('Profile created successfully!');
      console.log('Final form data:', formData);
    }
  };

  const getProgressPercentage = () => {
    switch (currentStep) {
      case 1: return 33;
      case 2: return 67;
      case 3: return 100;
      default: return 0;
    }
  };

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return <AboutForm formData={formData} errors={errors} onChange={handleInputChange} />;
      case 2:
        return <AccountForm formData={formData} errors={errors} onChange={handleInputChange} />;
      case 3:
        return <AddressForm formData={formData} errors={errors} onChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <Card.Header className="text-center">
              <h3>Build Your Profile</h3>
              <ProgressBar 
                now={getProgressPercentage()} 
                label={`${getProgressPercentage()}%`}
                className="mt-2"
              />
            </Card.Header>
            <Card.Body className="p-4">
              {renderCurrentForm()}
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              <Button 
                variant="secondary" 
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 3 ? (
                <Button variant="primary" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button variant="success" onClick={handleFinish}>
                  Finish
                </Button>
              )}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}