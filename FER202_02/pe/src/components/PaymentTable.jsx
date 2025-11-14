import React, { useState } from 'react';
import { Table, Card, Alert, Spinner, Button, Modal } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { formatCurrency, formatDate } from '../services/api';
import './PaymentTable.css';

const PaymentTable = ({ onEdit }) => {
    const { filteredPayments, loading, error, deletePayment } = usePayment();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    
    const handleEdit = (payment) => {
        if (onEdit) {
            onEdit(payment);
        }
    };

    const handleDeleteClick = (payment) => {
        setPaymentToDelete(payment);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (paymentToDelete) {
            setDeleting(true);
            const result = await deletePayment(paymentToDelete.id);
            setDeleting(false);
            
            if (result.success) {
                setShowDeleteModal(false);
                setPaymentToDelete(null);
            } else {
                alert('Error deleting expense: ' + result.error);
            }
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setPaymentToDelete(null);
    };

    if (loading) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5">Expense Management</Card.Header>
                <Card.Body className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="mt-2">Loading expenses...</p>
                </Card.Body>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5">Expense Management</Card.Header>
                <Card.Body>
                    <Alert variant="danger">
                        Error loading expenses: {error}
                    </Alert>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5">Expense Management</Card.Header>
                <Card.Body>
                    {filteredPayments.length === 0 ? (
                        <Alert variant="info">
                            No expenses found.
                        </Alert>
                    ) : (
                        <Table striped bordered hover responsive className="payment-table">
                            <thead className="table-header">
                                <tr>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.map((payment) => {
                                    const amount = typeof payment.amount === 'string' ? parseFloat(payment.amount) : payment.amount;
                                    return (
                                        <tr key={payment.id} className="payment-row">
                                            <td className="fw-medium">{payment.name}</td>
                                            <td>{formatCurrency(amount)}</td>
                                            <td>{payment.category}</td>
                                            <td>{formatDate(payment.date)}</td>
                                            <td className="text-center action-column">
                                                <div className="action-buttons">
                                                    <Button 
                                                        variant="warning" 
                                                        size="sm"
                                                        className="me-1"
                                                        onClick={() => handleEdit(payment)}
                                                        title="Edit"
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(payment)}
                                                        title="Delete"
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
            
            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={cancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you really want to delete this expense?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete} disabled={deleting}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
                        {deleting ? (
                            <>
                                <Spinner size="sm" animation="border" className="me-2" />
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PaymentTable;