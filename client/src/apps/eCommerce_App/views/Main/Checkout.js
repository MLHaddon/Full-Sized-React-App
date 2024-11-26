import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from 'axios';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://your-api-url/cart');
      setCart(response.data.items);
      setTotal(response.data.total);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleCreditCardPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // In a real application, you would send this data to your server
      // which would then communicate with your payment processor
      const response = await axios.post('http://your-api-url/process-credit-card', {
        ...cardDetails,
        amount: total
      });
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toString()
        }
      }]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details) {
      console.log('PayPal payment successful:', details);
      setSuccess(true);
    });
  };

  if (success) {
    return (
      <Container className="mt-4">
        <Alert variant="success">
          Payment successful! Thank you for your purchase.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Checkout</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={6}>
          <h4>Order Summary</h4>
          {cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Total:</strong>
            <strong>${total}</strong>
          </div>
        </Col>
        <Col md={6}>
          <h4>Payment Method</h4>
          <Form>
            <Form.Check 
              type="radio"
              label="Credit Card"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === 'creditCard'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check 
              type="radio"
              label="PayPal"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form>

          {paymentMethod === 'creditCard' && (
            <Form onSubmit={handleCreditCardPayment}>
              <Form.Group>
                <Form.Label>Card Number</Form.Label>
                <Form.Control 
                  type="text" 
                  name="cardNumber" 
                  value={cardDetails.cardNumber} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control 
                  type="text" 
                  name="expiryDate" 
                  value={cardDetails.expiryDate} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>CVV</Form.Label>
                <Form.Control 
                  type="text" 
                  name="cvv" 
                  value={cardDetails.cvv} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name on Card</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name" 
                  value={cardDetails.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
              <Button type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
              </Button>
            </Form>
          )}

          {paymentMethod === 'paypal' && (
            <PayPalScriptProvider options={{ 
              "client-id": "YOUR_PAYPAL_CLIENT_ID",
              currency: "USD"
            }}>
              <PayPalButtons 
                createOrder={createOrder}
                onApprove={onApprove}
                style={{ layout: "horizontal" }}
              />
            </PayPalScriptProvider>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;