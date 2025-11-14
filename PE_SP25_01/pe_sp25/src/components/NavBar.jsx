import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/AllBooks">
          <Navbar.Brand>My Books</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/AllBooks">
              <Nav.Link>All Books</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ReadingBooks">
              <Nav.Link>Reading Books</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/UnReadBooks">
              <Nav.Link>UnRead Books</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link>Add Book</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
