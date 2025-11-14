import React from 'react';
import { Card } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { formatCurrency } from '../services/api';

const TotalExpenses = () => {
    const { filteredPayments } = usePayment();
    
    // Calculate total expenses
    const totalAmount = filteredPayments.reduce((sum, payment) => {
        const amount = typeof payment.amount === 'string' ? parseFloat(payment.amount) : payment.amount;
        return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Total of Expenses</Card.Header>
            <Card.Body>
                <h3 className="text-primary mb-0">
                    {formatCurrency(totalAmount)}
                </h3>
            </Card.Body>
        </Card>
    );
};

export default TotalExpenses;
