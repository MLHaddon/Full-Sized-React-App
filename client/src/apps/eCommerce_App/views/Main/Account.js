import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

function Account() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St Anytown, USA',
  });

  const [orders, setOrders] = useState([
    { id: 1, date: '2023-05-01', total: 59.97, status: 'Delivered' },
    { id: 2, date: '2023-04-15', total: 89.98, status: 'Shipped' },
    { id: 3, date: '2023-03-30', total: 119.97, status: 'Processing' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., update user information)
    console.log('User information updated:', user);
  };

  return (
    <>
      <Container className="mt-4">
        <h2 className="mb-4">Your Account</h2>
        <Row>
          <Col md={6}>
            <h4>Personal Information</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={user.name} 
                  onChange={(e) => setUser({...user, name: e.target.value})}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  value={user.email} 
                  onChange={(e) => setUser({...user, email: e.target.value})}
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={user.address} 
                  onChange={(e) => setUser({...user, address: e.target.value})}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Update Information
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <h4>Order History</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>${order.total}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Account;