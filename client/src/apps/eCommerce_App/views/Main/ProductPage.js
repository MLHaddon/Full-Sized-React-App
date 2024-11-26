import React from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { StarFill, Star } from 'react-bootstrap-icons';

const ProductPage = ({ product }) => {
  // Helper function to render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      index < rating ? 
        <StarFill key={index} className="text-warning me-1" /> : 
        <Star key={index} className="text-warning me-1" />
    ));
  };

  // Calculate average rating
  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

  return (
    <Container className="py-5">
      <Row>
        {/* Left Column - Image */}
        <Col md={6}>
          <Card>
            <Card.Img 
              variant="top" 
              src="placeholder-image.jpg" 
              alt={product.name}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Card>
        </Col>

        {/* Right Column - Product Details */}
        <Col md={6}>
          {/* Product Name and Price */}
          <h1>{product.name}</h1>
          <h2 className="text-primary mb-4">${product.price.toFixed(2)}</h2>

          {/* Categories */}
          <div className="mb-3">
            {product.category.map((cat, index) => (
              <Badge 
                bg="secondary" 
                className="me-2" 
                key={index}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* Summary */}
          <p className="lead mb-4">{product.summary}</p>

          {/* Description */}
          <div className="mb-4">
            <h4>Description</h4>
            <p>{product.description}</p>
          </div>

          {/* Buy Button */}
          <Button 
            variant="primary" 
            size="lg" 
            className="w-100 mb-4"
          >
            Buy Now
          </Button>

          {/* Reviews */}
          <div>
            <h4>Customer Reviews</h4>
            <div className="mb-2">
              <span className="h5 me-2">
                Average Rating: {averageRating.toFixed(1)}
              </span>
              {renderStars(Math.round(averageRating))}
            </div>
            
            <ListGroup>
              {product.reviews.map((review, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex mb-1">
                    {renderStars(review.rating)}
                  </div>
                  <p className="mb-0">{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

// Example usage:
const ProductExample = () => {
  const sampleProduct = {
    "name": "Classic Penny Loafer",
    "summary": "Timeless leather penny loafer with premium craftsmanship",
    "description": "Hand-crafted from full-grain Italian leather, these penny loafers feature traditional moccasin stitching, a comfortable leather lining, and durable rubber soles. Perfect for both business and casual wear.",
    "price": 159.99,
    "category": ["Loafers", "Formal", "Men's"],
    "reviews": [
      {
        "rating": 5,
        "comment": "Most comfortable dress shoes I've owned. True to size."
      },
      {
        "rating": 4,
        "comment": "Great quality, but needed a few days to break in."
      }
    ]
  };

  return <ProductPage product={sampleProduct} />;
};

export default ProductExample;