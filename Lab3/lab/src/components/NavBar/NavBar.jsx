import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, InputGroup, NavDropdown } from 'react-bootstrap';

export default function NavBar({ onPageChange, currentPage }) {
  const [quickSearch, setQuickSearch] = useState('');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    // Implement quick search functionality
    console.log('Quick search:', quickSearch);
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Navbar.Brand 
        href="#" 
        onClick={(e) => { e.preventDefault(); handlePageClick('home'); }}
        style={{ cursor: 'pointer' }}
      >
        🎬 Movie Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {/* Navigation Links */}
        <Nav className="me-auto">
          <Nav.Link 
            href="#" 
            onClick={(e) => { e.preventDefault(); handlePageClick('home'); }}
            className={currentPage === 'home' ? 'active' : ''}
          >
            Home
          </Nav.Link>
          <Nav.Link 
            href="#" 
            onClick={(e) => { e.preventDefault(); handlePageClick('about'); }}
            className={currentPage === 'about' ? 'active' : ''}
          >
            About
          </Nav.Link>
          <Nav.Link 
            href="#" 
            onClick={(e) => { e.preventDefault(); handlePageClick('contact'); }}
            className={currentPage === 'contact' ? 'active' : ''}
          >
            Contact
          </Nav.Link>
        </Nav>

        {/* Right side: Search Form and User Actions */}
        <div className="d-flex align-items-center gap-3">
          {/* Quick Search Form */}
          <Form className="d-flex" onSubmit={handleQuickSearch}>
            <InputGroup size="sm" style={{ width: '200px' }}>
              <Form.Control
                type="search"
                placeholder="Quick search..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
              />
              <Button variant="outline-secondary" type="submit" size="sm">
                🔍
              </Button>
            </InputGroup>
          </Form>

          {/* User Action Icons */}
          <div className="d-flex align-items-center gap-2">
            {/* Accounts Dropdown */}
            <NavDropdown
              title="👤 Account"
              id="account-dropdown"
              align="end"
            >
              <NavDropdown.Item 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert('Manage Profiles feature coming soon!'); }}
              >
                Manage Your Profiles
              </NavDropdown.Item>
              <NavDropdown.Item 
                href="#" 
                onClick={(e) => { e.preventDefault(); handlePageClick('account'); }}
              >
                Build your Account
              </NavDropdown.Item>
              <NavDropdown.Item 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert('Change Password feature coming soon!'); }}
              >
                Change Password
              </NavDropdown.Item>
            </NavDropdown>

            {/* Login Button */}
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={() => alert('Login feature coming soon!')}
            >
              🔐 Login
            </Button>

            {/* Favourites */}
            <Button 
              variant="outline-warning" 
              size="sm"
              onClick={() => alert('Favourites feature coming soon!')}
            >
              ⭐ Favourites
            </Button>
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}