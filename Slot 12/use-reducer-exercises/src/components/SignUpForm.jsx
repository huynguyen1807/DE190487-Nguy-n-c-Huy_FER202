import React, { useReducer } from 'react';
import { Form, Button, Card, Alert, Spinner, Row, Col, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCalendar, FaEye, FaEyeSlash } from 'react-icons/fa';

// 1. Khởi tạo trạng thái ban đầu
const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  },
  errors: {},
  isLoading: false,
  isSubmitted: false,
  showPassword: false,
  showConfirmPassword: false,
  submitMessage: ''
};

// 2. Định nghĩa hàm reducer
function signUpReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        },
        errors: {
          ...state.errors,
          [action.field]: '' // Clear error for this field
        }
      };

    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message
        }
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      };

    case 'TOGGLE_PASSWORD_VISIBILITY':
      return {
        ...state,
        showPassword: !state.showPassword
      };

    case 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY':
      return {
        ...state,
        showConfirmPassword: !state.showConfirmPassword
      };

    case 'SUBMIT_START':
      return {
        ...state,
        isLoading: true,
        errors: {}
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isSubmitted: true,
        submitMessage: 'Đăng ký thành công! Chào mừng bạn đến với hệ thống.',
        formData: initialState.formData // Clear form data for security
      };

    case 'SUBMIT_ERROR':
      return {
        ...state,
        isLoading: false,
        submitMessage: action.message
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
}

function SignUpForm() {
  // 3. Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(signUpReducer, initialState);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 16;
    }
    return age >= 16;
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    const { formData } = state;

    // Required fields
    if (!formData.firstName.trim()) errors.firstName = 'Họ không được để trống';
    if (!formData.lastName.trim()) errors.lastName = 'Tên không được để trống';
    if (!formData.email.trim()) errors.email = 'Email không được để trống';
    if (!formData.phone.trim()) errors.phone = 'Số điện thoại không được để trống';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Ngày sinh không được để trống';
    if (!formData.password) errors.password = 'Mật khẩu không được để trống';
    if (!formData.confirmPassword) errors.confirmPassword = 'Xác nhận mật khẩu không được để trống';

    // Format validation
    if (formData.email && !validateEmail(formData.email)) {
      errors.email = 'Email không đúng định dạng';
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = 'Số điện thoại phải có 10-11 chữ số';
    }
    if (formData.password && !validatePassword(formData.password)) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    if (formData.dateOfBirth && !validateAge(formData.dateOfBirth)) {
      errors.dateOfBirth = 'Bạn phải từ 16 tuổi trở lên';
    }

    // Password confirmation
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    // Terms agreement
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
    }

    return errors;
  };

  // Event handlers
  const handleInputChange = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }

    dispatch({ type: 'SUBMIT_START' });

    // Simulate API call
    setTimeout(() => {
      // Simulate email check (for demo)
      if (state.formData.email === 'admin@test.com') {
        dispatch({ 
          type: 'SUBMIT_ERROR', 
          message: 'Email này đã được sử dụng. Vui lòng chọn email khác.' 
        });
        dispatch({ type: 'SET_ERROR', field: 'email', message: 'Email đã tồn tại' });
      } else {
        dispatch({ type: 'SUBMIT_SUCCESS' });
      }
    }, 2000); // Simulate network delay
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  // Render success state
  if (state.isSubmitted) {
    return (
      <Card className="p-4">
        <Card.Body className="text-center">
          <div className="mb-4">
            <div style={{ fontSize: '60px', color: '#28a745' }}>✅</div>
            <h2 className="text-success mt-3">Đăng ký thành công!</h2>
            <p className="text-muted mt-3">{state.submitMessage}</p>
          </div>
          
          <div className="mb-4 p-3 bg-light rounded">
            <h5>Thông tin tài khoản:</h5>
            <p><strong>Họ tên:</strong> {initialState.formData.firstName} {initialState.formData.lastName}</p>
            <p><strong>Email:</strong> {initialState.formData.email}</p>
            <p><strong>Số điện thoại:</strong> {initialState.formData.phone}</p>
          </div>

          <Button variant="primary" onClick={handleReset}>
            Đăng ký tài khoản khác
          </Button>
        </Card.Body>
      </Card>
    );
  }

  // Render form
  return (
    <Card className="p-4">
      <Card.Body>
        <h2 className="text-center mb-4">
          <FaUser className="me-2" />
          Đăng Ký Tài Khoản
        </h2>

        {state.submitMessage && !state.isSubmitted && (
          <Alert variant="danger">
            {state.submitMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Họ *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ"
                  value={state.formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  isInvalid={!!state.errors.firstName}
                  disabled={state.isLoading}
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên"
                  value={state.formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  isInvalid={!!state.errors.lastName}
                  disabled={state.isLoading}
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaEnvelope /></InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                value={state.formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                isInvalid={!!state.errors.email}
                disabled={state.isLoading}
              />
              <Form.Control.Feedback type="invalid">
                {state.errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Phone and Date of Birth */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại *</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaPhone /></InputGroup.Text>
                  <Form.Control
                    type="tel"
                    placeholder="0123456789"
                    value={state.formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    isInvalid={!!state.errors.phone}
                    disabled={state.isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.phone}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ngày sinh *</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaCalendar /></InputGroup.Text>
                  <Form.Control
                    type="date"
                    value={state.formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    isInvalid={!!state.errors.dateOfBirth}
                    disabled={state.isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.dateOfBirth}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu *</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaLock /></InputGroup.Text>
              <Form.Control
                type={state.showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                value={state.formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                isInvalid={!!state.errors.password}
                disabled={state.isLoading}
              />
              <Button
                variant="outline-secondary"
                onClick={() => dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' })}
                disabled={state.isLoading}
              >
                {state.showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {state.errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3">
            <Form.Label>Xác nhận mật khẩu *</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaLock /></InputGroup.Text>
              <Form.Control
                type={state.showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={state.formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                isInvalid={!!state.errors.confirmPassword}
                disabled={state.isLoading}
              />
              <Button
                variant="outline-secondary"
                onClick={() => dispatch({ type: 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY' })}
                disabled={state.isLoading}
              >
                {state.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {state.errors.confirmPassword}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Terms Agreement */}
          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              id="agreeToTerms"
              label="Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật"
              checked={state.formData.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
              isInvalid={!!state.errors.agreeToTerms}
              disabled={state.isLoading}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.agreeToTerms}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Submit Buttons */}
          <Row>
            <Col md={6}>
              <Button
                variant="primary"
                type="submit"
                disabled={state.isLoading}
                size="lg"
                className="w-100"
              >
                {state.isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Đang đăng ký...
                  </>
                ) : (
                  'Đăng ký'
                )}
              </Button>
            </Col>
            <Col md={6}>
              <Button
                variant="outline-secondary"
                type="button"
                onClick={handleReset}
                disabled={state.isLoading}
                size="lg"
                className="w-100"
              >
                Đặt lại
              </Button>
            </Col>
          </Row>
        </Form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Đã có tài khoản? <strong>Đăng nhập ngay</strong>
          </small>
        </div>

        <div className="mt-3">
          <small className="text-muted">
            <strong>Lưu ý:</strong> Email "admin@test.com" đã được sử dụng (để test validation)
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SignUpForm;