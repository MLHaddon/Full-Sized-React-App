import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BrowseProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock product data (replace with actual data from your backend)
  const products = [
    { id: 1, name: 'Wireless Headphones', price: 199.99, category: 'Electronics', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Running Shoes', price: 89.99, category: 'Sports', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Coffee Maker', price: 49.99, category: 'Home', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Laptop', price: 999.99, category: 'Electronics', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Yoga Mat', price: 29.99, category: 'Sports', image: 'https://via.placeholder.com/150' },
  ];

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container className="mt-4">
        <h2 className="mb-4">Browse Products</h2>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Control 
              type="text" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <div className="d-flex justify-content-end">
              {categories.map(category => (
                <Badge 
                  key={category}
                  pill 
                  bg={selectedCategory === category ? "primary" : "secondary"}
                  className="me-2 cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                  style={{ cursor: 'pointer' }}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          {filteredProducts.map(product => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price.toFixed(2)}</Card.Text>
                  <Badge bg="info" className="mb-2">{product.category}</Badge>
                  <div>
                    <Link to={`/product/${product.id}`}>
                      <Button variant="primary" className="me-2">View Details</Button>
                    </Link>
                    <Button variant="success">Add to Cart</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default BrowseProducts;

