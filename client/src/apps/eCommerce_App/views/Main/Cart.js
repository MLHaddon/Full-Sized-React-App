import React from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';

function Cart() {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
    { id: 3, name: 'Product 3', price: 39.99, quantity: 3 },
  ];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <>
      <Container className="mt-4">
        <h2 className="mb-4">Your Cart</h2>
        <Row>
          <Col md={8}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <Form.Control type="number" min="1" value={item.quantity} />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button variant="danger" size="sm">Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={4}>
            <h4>Order Summary</h4>
            <Table>
              <tbody>
                <tr>
                  <td>Subtotal:</td>
                  <td>${calculateTotal()}</td>
                </tr>
                <tr>
                  <td>Shipping:</td>
                  <td>$5.00</td>
                </tr>
                <tr>
                  <td><strong>Total:</strong></td>
                  <td><strong>${(parseFloat(calculateTotal()) + 5).toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </Table>
            <Button variant="primary" block>Proceed to Checkout</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cart;