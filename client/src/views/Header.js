import React from "react";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Header() {
  const { isAuthenticated, username, logout } = useAuth();
  const location = useLocation();

  const MainNavLinks = () => (
    <>
      <Nav.Link as={Link} to="/" className="nav-item px-3">Home</Nav.Link>
      <Nav.Link as={Link} to="/resume" className="nav-item px-3">Resume</Nav.Link>
    </>
  );

  const EcommerceNavLinks = () => (
    <>
      <Nav.Link as={Link} to="/ecommerce/home" className="nav-item px-3">Home</Nav.Link>
      <Nav.Link as={Link} to="/ecommerce/browse" className="nav-item px-3">Products</Nav.Link>
      <Nav.Link as={Link} to="/ecommerce/cart" className="nav-item px-3">Cart</Nav.Link>
      <Nav.Link as={Link} to="/ecommerce/checkout" className="nav-item px-3">Checkout</Nav.Link>
      <Nav.Link as={Link} to="/ecommerce/account" className="nav-item px-3">Profile</Nav.Link>
      <Nav.Link as={Link} to="/ecommerce/productpage" className="nav-item px-3">ProductView</Nav.Link>
    </>
  );

  return (
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm py-2">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="font-weight-bold px-3">Welcome</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-flex align-items-center">
            {isAuthenticated && (
              <>
                {!location.pathname.startsWith("/ecommerce") ? <MainNavLinks /> : <EcommerceNavLinks />}
                <NavDropdown title="Portfolio" id="portfolio-dropdown" className="nav-item px-3">
                  <NavDropdown.Item as={Link} to="/ecommerce/home" className="px-3">eCommerce App</NavDropdown.Item>
                  {/* Add more portfolio items here */}
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav className="d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <Navbar.Text className="px-3">
                  Welcome, <span className="fw-bold">{username}</span>
                </Navbar.Text>
                <Nav.Item className="px-3">
                  <Button variant="outline-primary" size="sm" onClick={logout}>Log Out</Button>
                </Nav.Item>
              </>
            ) : (
              <NavDropdown title="Login/Signup" id="auth-dropdown" align="end" className="nav-item px-3">
                <NavDropdown.Item as={Link} to="/login" className="px-3">Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/signup" className="px-3">Signup</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;