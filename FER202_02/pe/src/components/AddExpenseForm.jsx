import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';

const AddExpenseForm = ({ editingExpense, onCancelEdit }) => {
    const { addPayment, updatePayment, payments } = usePayment();
    const { user } = useAuth();
    
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        date: ''
    });
    
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    
    // Get unique categories from existing payments
    const uniqueCategories = [...new Set(payments.map(p => p.category))];
    
    // Load editing expense data
    useEffect(() => {
        if (editingExpense) {
            setFormData({
                name: editingExpense.name,
                amount: editingExpense.amount.toString(),
                category: editingExpense.category,
                date: editingExpense.date
            });
        }
    }, [editingExpense]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name must not be empty';
        }
        
        if (!formData.category.trim()) {
            newErrors.category = 'Category must not be empty';
        }
        
        if (!formData.amount.trim()) {
            newErrors.amount = 'Amount is required';
        } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be a valid number greater than 0';
        }
        
        if (!formData.date) {
            newErrors.date = 'Date is required';
        }
        
        return newErrors;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        const expenseData = {
            ...formData,
            amount: parseFloat(formData.amount),
            userId: user.id
        };
        
        let result;
        if (editingExpense) {
            // Update existing expense
            result = await updatePayment(editingExpense.id, expenseData);
        } else {
            // Add new expense
            result = await addPayment(expenseData);
        }
        
        if (result.success) {
            // Reset form
            handleReset();
            setErrors({});
            setShowSuccess(true);
            
            // If editing, cancel edit mode
            if (editingExpense && onCancelEdit) {
                onCancelEdit();
            }
            
            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);
        } else {
            setErrors({ submit: result.error });
        }
    };
    
    const handleReset = () => {
        setFormData({
            name: '',
            amount: '',
            category: '',
            date: ''
        });
        setErrors({});
        setShowSuccess(false);
        
        // If editing, cancel edit mode
        if (editingExpense && onCancelEdit) {
            onCancelEdit();
        }
    };
    
    const isEditMode = !!editingExpense;
    
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">
                {isEditMode ? 'Edit Expense' : 'Add Expense'}
            </Card.Header>
            <Card.Body>
                {showSuccess && (
                    <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
                        Expense {isEditMode ? 'updated' : 'added'} successfully!
                    </Alert>
                )}
                
                {errors.submit && (
                    <Alert variant="danger">
                        {errors.submit}
                    </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    {/* Amount and Category on same row */}
                    <Row className="mb-3">
                        <Col xs={6}>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    isInvalid={!!errors.amount}
                                    step="1000"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.amount}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        
                        <Col xs={6}>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    isInvalid={!!errors.category}
                                >
                                    <option value="">Select category</option>
                                    {uniqueCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.category}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    {/* Date Field */}
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            isInvalid={!!errors.date}
                            placeholder="mm/dd/yyyy"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.date}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    {/* Buttons */}
                    <div className="d-flex gap-2">
                        <Button 
                            variant="secondary" 
                            type="button" 
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit"
                        >
                            {isEditMode ? 'Save' : 'Add expense'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AddExpenseForm;
