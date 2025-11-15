import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="text-white">ExamiVana</h5>
            <p>Online Examination System for Teachers and Students.</p>
          </Col>
          <Col md={4}>
            <h5 className="text-white">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#about" className="text-primary">About</a></li>
              <li><a href="#contact" className="text-primary">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="text-white">Contact Us</h5>
            <p>Email: support@examivana.com</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p>&copy; 2025 ExamiVana. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;