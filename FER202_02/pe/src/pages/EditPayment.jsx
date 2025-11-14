import React, { useReducer, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { usePayment } from '../contexts/PaymentContext';
import NavigationHeader from '../components/NavigationHeader';

// 1. Khởi tạo trạng thái ban đầu cho form
const initialFormState = {
  formData: {
    name: '',
    category: '',
    amount: '',
    date: '',
  },
  errors: {},
  isSubmitting: false,
  isLoading: true,
};

// 2. Định nghĩa reducer cho form 
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: action.data,
        isLoading: false,
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    case 'CLEAR_ERROR':
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.value,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.value,
      };
    default:
      return state;
  }
}

const EditPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { updatePayment, getPaymentById } = usePayment();

  // Load payment data
  useEffect(() => {
    const loadPayment = async () => {
      dispatch({ type: 'SET_LOADING', value: true });
      
      const result = await getPaymentById(id);
      
      if (result.success) {
        const payment = result.payment;
        dispatch({ 
          type: 'SET_FORM_DATA', 
          data: {
            name: payment.name,
            category: payment.category,
            amount: payment.amount.toString(),
            date: payment.date,
          }
        });
      } else {
        alert('Error loading payment: ' + result.error);
        navigate('/home');
      }
    };

    if (id) {
      loadPayment();
    }
  }, [id, getPaymentById, navigate]);

  // Validation form
  const validateForm = () => {
    const errors = {};
    const { name, category, amount, date } = formState.formData;

    if (!name.trim()) {
      errors.name = 'Name must not be empty.';
    }

    if (!category.trim()) {
      errors.category = 'Category must not be empty.';
    }

    if (!amount.trim()) {
      errors.amount = 'Amount is required.';
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      errors.amount = 'Amount must be a valid number greater than 0.';
    }

    if (!date.trim()) {
      errors.date = 'Date is required.';
    }

    return errors;
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });

    // Clear specific field error khi user nhập
    if (formState.errors[name]) {
      dispatch({ type: 'CLEAR_ERROR', field: name });
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    dispatch({ type: 'SET_SUBMITTING', value: true });

    try {
      const paymentData = {
        ...formState.formData,
        amount: parseFloat(formState.formData.amount),
      };

      const result = await updatePayment(id, paymentData);

      if (result.success) {
        // Thành công, chuyển về trang home
        navigate('/home');
      } else {
        // Hiển thị lỗi
        alert('Error updating payment: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred.');
    } finally {
      dispatch({ type: 'SET_SUBMITTING', value: false });
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  const handleViewDetails = () => {
    navigate(`/payment-details/${id}`);
  };

  if (formState.isLoading) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <Card>
            <Card.Body className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-2">Loading payment data...</p>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Edit Expense</h3>
                <Button variant="outline-info" size="sm" onClick={handleViewDetails}>
                  View Details
                </Button>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} noValidate>
                  {/* Name Field */}
                  <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formState.formData.name}
                      onChange={handleChange}
                      isInvalid={!!formState.errors.name}
                      disabled={formState.isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Category Field */}
                  <Form.Group controlId="category" className="mb-3">
                    <Form.Label>Category *</Form.Label>
                    <Form.Control
                      type="text"
                      name="category"
                      value={formState.formData.category}
                      onChange={handleChange}
                      isInvalid={!!formState.errors.category}
                      disabled={formState.isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.category}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Amount Field */}
                  <Form.Group controlId="amount" className="mb-3">
                    <Form.Label>Amount *</Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={formState.formData.amount}
                      onChange={handleChange}
                      isInvalid={!!formState.errors.amount}
                      disabled={formState.isSubmitting}
                      min="0"
                      step="1000"
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.amount}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Date Field */}
                  <Form.Group controlId="date" className="mb-3">
                    <Form.Label>Date *</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formState.formData.date}
                      onChange={handleChange}
                      isInvalid={!!formState.errors.date}
                      disabled={formState.isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.date}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      disabled={formState.isSubmitting}
                      className="flex-fill"
                    >
                      {formState.isSubmitting ? (
                        <>
                          <Spinner size="sm" animation="border" role="status" className="me-2" />
                          Updating...
                        </>
                      ) : (
                        'Update Expense'
                      )}
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      type="button" 
                      onClick={handleCancel}
                      disabled={formState.isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditPayment;