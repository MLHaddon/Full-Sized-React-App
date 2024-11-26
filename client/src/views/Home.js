import React from 'react';
import Mountains from './images/co_mountains.jpg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function Home() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="position-relative" style={{ width: '80%', maxWidth: '1200px' }}>
        <img 
          className="img-fluid w-100" 
          src={Mountains} 
          alt="Mountains" 
          style={{ minHeight: '300px', objectFit: 'cover' }}
        />
        <Button 
          className="position-absolute top-50 start-50 translate-middle"
          variant="primary"
          size="lg"
        >
          <Link to="/resume" className="text-white text-decoration-none">View my Resume</Link>
        </Button>
      </div>
      <h2 className="text-center mt-4">
        Please click on Resume to see my resume or Login/Signup to view my portfolio.
      </h2>
    </Container>
  );
}

export default Home;