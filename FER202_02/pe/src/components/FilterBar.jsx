import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';

const FilterBar = () => {
    const { payments, filters, setFilter } = usePayment();
    
    // Get unique categories from payments
    const uniqueCategories = [...new Set(payments.map(p => p.category))];
    
    const handleFilterChange = (value) => {
        setFilter('category', value);
    };
    
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Filter</Card.Header>
            <Card.Body>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        value={filters.category}
                        onChange={(e) => handleFilterChange(e.target.value)}
                    >
                        <option value="">All categories</option>
                        {uniqueCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default FilterBar;