// NavigationHeader.jsx là component thanh điều hướng chung chứa thông tin đăng nhập và nút Logout
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import logo from "../image/logo.png";
const gray = "#7d7874ff";
const NavigationHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const fullName = user?.fullName || user?.username || 'Student';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAddPayment = () => {
        navigate('/add-payment');
    };

    const handleHome = () => {
        navigate('/home');
    };
    
    return (
        <Navbar bg="secondary" variant="dark" expand="lg" className="mb-4">
            <Container>
                <img src={logo} alt="PersonalBudget Logo" style={{ height: '40px', marginRight: '10px' }} />
                <Navbar.Brand onClick={handleHome} style={{ cursor: 'pointer' }}>
                    PersonalBudget
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav className="ms-auto d-flex align-items-center">
                        
                        <Navbar.Text className="me-3">
                            Signed in as: <strong>{fullName}</strong>
                        </Navbar.Text>
                        <Button variant="outline-light" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationHeader;