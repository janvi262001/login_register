import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

function LandingPage() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">MyApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/login-admin">Login</Nav.Link>
              <Nav.Link as={Link} to="/register-admin">Register as Admin</Nav.Link>
              <Nav.Link as={Link} to="/register-customer">Register as User</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="text-center mt-5">
        <h1 className="display-4">Welcome to MyApp!</h1>
        <p className="lead">Your one-stop solution for managing your tasks efficiently.</p>
        <div className="mt-4">
          <Button variant="primary" size="lg" as={Link} to="/register-admin">Get Started</Button>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
