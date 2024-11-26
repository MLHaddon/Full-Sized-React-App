import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import shoeProducts from '../../Assets/ShoeProducts.json';
import { useState } from 'react';
import axios from '../../../../api/axios';

function ECommerceHome() {
  // State to store the products
  const [products, setProducts] = useState([]);
  // const [product, setProduct] = useState();

  const getProducts = async () => {
      const shoes = shoeProducts.shoes;
      console.log(shoes);
      setProducts(shoes);
      console.log({ products });
      updateProducts();
      // update products in database with a callback function
      // const response = await axios.get('/api/products/get');
      // console.log(response.data); //! What data type is this ??? ------------------------------------------------------
  };

  const addToCart = (product) => {
    // Implement your logic to add the product to the cart
    console.log(`Added ${product.name} to the cart`);
  };

  const handleBuyNow = (product) => {
    // Implement your logic to handle the "Buy Now" button click
    console.log(`Bought ${product.name}`);
  };

  const updateProducts = async () => {
    // Axios post request to take the json data from the products state and update the database
    const response = await axios.put('/api/products/update', { products });
    // Update the products state with the response data
    console.log(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Container className="mt-4">
        <Carousel className="mb-4">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Welcome to Our Store</h3>
              <p>Discover amazing products at great prices!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>New Arrivals</h3>
              <p>Check out our latest products!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <h2 className="mb-4">Featured Products</h2>
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-4">
          <Col md={6}>
            <h3>About Us</h3>
            <p>We are an eCommerce store dedicated to providing high-quality products at competitive prices. Our goal is to ensure customer satisfaction with every purchase.</p>
          </Col>
          <Col md={6}>
            <h3>Customer Service</h3>
            <p>Our customer service team is available 24/7 to assist you with any questions or concerns. Feel free to contact us anytime!</p>
            <Button variant="secondary">Contact Us</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ECommerceHome;