import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import TotalExpenses from '../components/TotalExpenses';
import FilterBar from '../components/FilterBar';
import AddExpenseForm from '../components/AddExpenseForm';
import PaymentTable from '../components/PaymentTable';
import Footer from '../components/Footer';
import { PaymentProvider } from '../contexts/PaymentContext';

const DashboardPage = () => {
    const [editingExpense, setEditingExpense] = useState(null);
    
    const handleEdit = (expense) => {
        setEditingExpense(expense);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleCancelEdit = () => {
        setEditingExpense(null);
    };
      
    return (
        <PaymentProvider>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />
            
            {/* 2. Main Dashboard Content */}
            <Container>
                <Row>
                    {/* Left Column: Total + Add Expense Form */}
                    <Col md={4}>
                        <TotalExpenses />
                        <AddExpenseForm 
                            editingExpense={editingExpense}
                            onCancelEdit={handleCancelEdit}
                        />
                    </Col>
                    
                    {/* Right Column: Filter + Expense Management */}
                    <Col md={8}>
                        <FilterBar />
                        <PaymentTable onEdit={handleEdit} />
                    </Col>
                </Row>
            </Container>
            
            {/* 3. Footer */}
            <Footer />
        </PaymentProvider>    
    );
};

export default DashboardPage;