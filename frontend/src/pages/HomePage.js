import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card, Carousel, Accordion, Form, ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });
    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach(el => observer.observe(el));
  }, []);

  return (
    <>
      {/* Hero Section - Enhanced with Better Spacing */}
      <div className="hero-section parallax">
        <div className="hero-bg-animation"></div>
        <Container fluid>
          <Row className="align-items-center text-center">
            <Col>
              <div className="hero-icons mb-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>Easy Creation</Tooltip>}>
                  <i className="bi bi-pencil-square pulse-icon display-4 me-3" style={{ color: '#ff6b35' }}></i>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Secure Platform</Tooltip>}>
                  <i className="bi bi-shield-lock pulse-icon display-4 me-3" style={{ color: '#4caf50' }}></i>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Instant Analytics</Tooltip>}>
                  <i className="bi bi-bar-chart-line pulse-icon display-4" style={{ color: '#9c27b0' }}></i>
                </OverlayTrigger>
              </div>
              <h1 className="hero-title">Create, Share, and Analyze Exams with ExamiVana</h1>
              <p className="lead hero-text">The easiest way to build professional online exams. Trusted by educators worldwide.</p>
              <Button as={Link} to="/register" variant="primary" size="lg" className="me-3 hero-btn">
                <i className="bi bi-rocket-takeoff me-2"></i>Start Creating Exams
              </Button>
              <Button as={Link} to="/demo" variant="primary" size="lg" className="hero-btn">
              
                <i className="bi bi-play-circle me-2"></i>View Demo
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Why Choose Us Section - Improved with Better Grid */}
      <Container className="why-choose-us-section py-5 scroll-fade-in" style={{ background: 'linear-gradient(135deg, #fff3e0 0%, #f3e5f5 100%)' }}>
        <Row className="text-center mb-5">
          <Col>
            <h2>Why Choose ExamiVana?</h2>
            <p className="text-muted">Join thousands of educators revolutionizing online assessments.</p>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="text-center mb-4">
            <i className="bi bi-people-fill display-4 mb-3" style={{ color: '#ff6b35' }}></i>
            <h3>10,000+</h3>
            <p className="text-muted">Active Users</p>
          </Col>
          <Col md={3} className="text-center mb-4">
            <i className="bi bi-trophy-fill display-4 mb-3" style={{ color: '#4caf50' }}></i>
            <h3>500+</h3>
            <p className="text-muted">Institutions</p>
          </Col>
          <Col md={3} className="text-center mb-4">
            <i className="bi bi-clock-fill display-4 mb-3" style={{ color: '#9c27b0' }}></i>
            <h3>99.9%</h3>
            <p className="text-muted">Uptime</p>
          </Col>
          <Col md={3} className="text-center mb-4">
            <i className="bi bi-star-fill display-4 mb-3" style={{ color: '#ff6b35' }}></i>
            <h3>4.8/5</h3>
            <p className="text-muted">User Rating</p>
          </Col>
        </Row>
      </Container>

      {/* Features Section - Enhanced Cards with Hover Effects */}
      <Container className="features-section py-5 scroll-fade-in">
        <Row className="text-center mb-5">
          <Col>
            <h2>Powerful Features for Seamless Exams</h2>
            <p className="text-muted">Everything you need to create, manage, and analyze online assessments.</p>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="text-center mb-4">
            <Card className="feature-card hover-lift">
              <Card.Body>
                <OverlayTrigger placement="top" overlay={<Tooltip>Drag-and-drop interface</Tooltip>}>
                  <i className="bi bi-pencil-square zoom-icon display-4 mb-3" style={{ color: '#ff6b35' }}></i>
                </OverlayTrigger>
                <Card.Title>Easy Exam Creation</Card.Title>
                <Card.Text>Build MCQ exams with customizable questions and options in minutes.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center mb-4">
            <Card className="feature-card hover-lift">
              <Card.Body>
                <OverlayTrigger placement="top" overlay={<Tooltip>JWT secured</Tooltip>}>
                  <i className="bi bi-shield-lock zoom-icon display-4 mb-3" style={{ color: '#4caf50' }}></i>
                </OverlayTrigger>
                <Card.Title>Secure & Reliable</Card.Title>
                <Card.Text>JWT authentication and deadline enforcement ensure exam integrity.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center mb-4">
            <Card className="feature-card hover-lift">
              <Card.Body>
                <OverlayTrigger placement="top" overlay={<Tooltip>Real-time reports</Tooltip>}>
                  <i className="bi bi-bar-chart-line zoom-icon display-4 mb-3" style={{ color: '#9c27b0' }}></i>
                </OverlayTrigger>
                <Card.Title>Instant Analytics</Card.Title>
                <Card.Text>Get detailed reports and insights on student performance.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="text-center mb-4">
            <Card className="feature-card hover-lift">
              <Card.Body>
                <OverlayTrigger placement="top" overlay={<Tooltip>Auto-submit on time</Tooltip>}>
                  <i className="bi bi-clock-history zoom-icon display-4 mb-3" style={{ color: '#ff6b35' }}></i>
                </OverlayTrigger>
                <Card.Title>Auto-Grading</Card.Title>
                <Card.Text>Automatic scoring with remarks for quick feedback.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center mb-4">
            <Card className="feature-card hover-lift">
              <Card.Body>
                <OverlayTrigger placement="top" overlay={<Tooltip>Real-time messaging</Tooltip>}>
                  <i className="bi bi-chat-dots zoom-icon display-4 mb-3" style={{ color: '#4caf50' }}></i>
                </OverlayTrigger>
                <Card.Title>Integrated Chat</Card.Title>
                <Card.Text>Communicate with students during exams for support.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center mb-4">
            <Card className="feature-card hover-lift">
              <Card.Body>
                <OverlayTrigger placement="top" overlay={<Tooltip>Responsive design</Tooltip>}>
                  <i className="bi bi-device-mobile zoom-icon display-4 mb-3" style={{ color: '#9c27b0' }}></i>
                </OverlayTrigger>
                <Card.Title>Mobile Friendly</Card.Title>
                <Card.Text>Take exams on any device with responsive design.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Features in Detail Section - Improved Accordion */}
      <Container className="features-detail-section py-5 scroll-fade-in" style={{ background: 'linear-gradient(135deg, #f3e5f5 0%, #e8f5e8 100%)' }}>
        <Row className="text-center mb-5">
          <Col>
            <h2>Features in Detail</h2>
            <p className="text-muted">Dive deeper into what makes ExamiVana special.</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <i className="bi bi-shield-lock me-2" style={{ color: '#ff6b35' }}></i>Security Features
                </Accordion.Header>
                <Accordion.Body>
                  Our platform uses advanced encryption, JWT tokens, and real-time monitoring to prevent cheating and ensure data privacy.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <i className="bi bi-bar-chart-line me-2" style={{ color: '#4caf50' }}></i>Analytics Dashboard
                </Accordion.Header>
                <Accordion.Body>
                  View detailed performance metrics, question-wise analysis, and exportable reports for better insights.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col md={6}>
            <Accordion>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <i className="bi bi-chat-dots me-2" style={{ color: '#9c27b0' }}></i>Real-Time Chat
                </Accordion.Header>
                <Accordion.Body>
                  Integrated chat allows teachers to assist students instantly, improving exam experience.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <i className="bi bi-device-mobile me-2" style={{ color: '#ff6b35' }}></i>Mobile Optimization
                </Accordion.Header>
                <Accordion.Body>
                  Fully responsive design ensures exams work seamlessly on phones, tablets, and desktops.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      {/* How It Works Section */}
      <Container className="how-it-works-section py-5 scroll-fade-in">
        <Row className="text-center mb-5">
          <Col>
            <h2>How ExamiVana Works</h2>
            <p className="text-muted">Get started in three simple steps.</p>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="text-center">
            <div className="step-icon glow-icon">
              <i className="bi bi-1-circle-fill display-4" style={{ color: '#ff6b35' }}></i>
            </div>
            <h4>Sign Up</h4>
            <p>Create your account as a teacher or student.</p>
          </Col>
          <Col md={4} className="text-center">
            <div className="step-icon glow-icon">
              <i className="bi bi-2-circle-fill display-4" style={{ color: '#4caf50' }}></i>
            </div>
            <h4>Create or Join</h4>
            <p>Teachers build exams; students enter the code to start.</p>
          </Col>
          <Col md={4} className="text-center">
            <div className="step-icon glow-icon">
              <i className="bi bi-3-circle-fill display-4" style={{ color: '#9c27b0' }}></i>
            </div>
            <h4>View Results</h4>
            <p>Auto-grade and analyze performance instantly.</p>
          </Col>
        </Row>
      </Container>

      {/* Success Metrics Section - New, Image-Free Replacement for Partners */}
      <Container className="success-metrics-section py-5 scroll-fade-in" style={{ background: 'linear-gradient(135deg, #e8f5e8 0%, #fff3e0 100%)' }}>
        <Row className="text-center mb-5">
          <Col>
            <h2>Success Metrics</h2>
            <p className="text-muted">Real achievements from our community.</p>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="text-center mb-4">
            <i className="bi bi-check-circle-fill display-4 mb-3" style={{ color: '#4caf50' }}></i>
            <h3>95%</h3>
            <p className="text-muted">Exams Completed Successfully</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <i className="bi bi-lightning-fill display-4 mb-3" style={{ color: '#ff6b35' }}></i>
            <h3>2x Faster</h3>
            <p className="text-muted">Grading Time Reduced</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <i className="bi bi-heart-fill display-4 mb-3" style={{ color: '#9c27b0' }}></i>
            <h3>98%</h3>
            <p className="text-muted">User Satisfaction Rate</p>
          </Col>
        </Row>
      </Container>

      {/* Video Demo Section */}
      <Container className="video-demo-section py-5 scroll-fade-in">
        <Row className="text-center mb-5">
          <Col>
            <h2>See ExamiVana in Action</h2>
            <p className="text-muted">Watch our demo video to understand how it works.</p>
            <div className="video-wrapper">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Demo Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Testimonials Section */}
      <Container className="testimonials-section py-5 scroll-fade-in">
        <Row className="text-center mb-4">
          <Col>
            <h2>What Our Users Say</h2>
          </Col>
        </Row>
        <Carousel>
          <Carousel.Item>
            <Card className="testimonial-card mx-auto" style={{ maxWidth: '600px' }}>
              <Card.Body>
                <i className="bi bi-quote display-4 text-muted mb-3 fade-in-icon"></i>
                <p className="fst-italic">"ExamiVana made online exams so much easier. The auto-grading is a lifesaver!"</p>
                <footer className="blockquote-footer text-end">Sarah Johnson, Teacher</footer>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card className="testimonial-card mx-auto" style={{ maxWidth: '600px' }}>
              <Card.Body>
                <i className="bi bi-quote display-4 text-muted mb-3 fade-in-icon"></i>
                <p className="fst-italic">"As a student, I love the instant feedback and chat feature."</p>
                <footer className="blockquote-footer text-end">Mike Lee, Student</footer>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card className="testimonial-card mx-auto" style={{ maxWidth: '600px' }}>
              <Card.Body>
                <i className="bi bi-quote display-4 text-muted mb-3 fade-in-icon"></i>
                <p className="fst-italic">"Professional and secure – perfect for our institution."</p>
                <footer className="blockquote-footer text-end">Dr. Emily Carter, University Dean</footer>
              </Card.Body>
            </Card>
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Pricing Section */}
      <Container className="pricing-section py-5 scroll-fade-in">
        <Row className="text-center mb-5">
          <Col>
            <h2>Choose Your Plan</h2>
            <p className="text-muted">Flexible pricing for every need.</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className="pricing-card text-center mb-4">
              <Card.Body>
                <i className="bi bi-star-fill display-4 mb-3" style={{ color: '#ff6b35' }}></i>
                <Card.Title>Free</Card.Title>
                <Card.Text>$0/month<br />Up to 10 exams, basic features.</Card.Text>
                <Button variant="primary">Get Started</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="pricing-card text-center mb-4 popular">
              <Card.Body>
                <i className="bi bi-gem display-4 mb-3 pulse-icon" style={{ color: '#4caf50' }}></i>
                <Card.Title>Pro</Card.Title>
                <Card.Text>$19/month<br />Unlimited exams, advanced analytics.</Card.Text>
                <Button variant="success">Choose Pro</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="pricing-card text-center mb-4">
              <Card.Body>
                <i className="bi bi-building display-4 mb-3" style={{ color: '#9c27b0' }}></i>
                <Card.Title>Enterprise</Card.Title>
                <Card.Text>$49/month<br />Custom solutions for large institutions.</Card.Text>
                <Button variant="danger">Contact Sales</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
            {/* FAQ Section */}
      <Container className="faq-section py-5 scroll-fade-in">
        <Row className="text-center mb-5">
          <Col>
            <h2>Frequently Asked Questions</h2>
          </Col>
        </Row>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>How secure is ExamiVana?</Accordion.Header>
            <Accordion.Body>JWT authentication, encrypted data, and deadline enforcement ensure integrity and privacy.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Can I take exams on mobile?</Accordion.Header>
            <Accordion.Body>Yes, ExamiVana is fully responsive and works seamlessly on mobile and PC devices.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>What if I miss the deadline?</Accordion.Header>
            <Accordion.Body>Exams are inaccessible after the deadline, and students will see a message indicating the exam is no longer available.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Is there a free trial?</Accordion.Header>
            <Accordion.Body>Yes, sign up for the Free plan to try basic features with up to 10 exams.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>How does auto-grading work?</Accordion.Header>
            <Accordion.Body>Our system automatically scores MCQ exams and provides remarks based on performance (Excellent, Good, Fair, Poor).</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      {/* Newsletter Section */}
      <Container className="newsletter-section py-5 scroll-fade-in">
        <Row className="text-center">
          <Col md={6} className="mx-auto">
            <i className="bi bi-envelope-fill display-4 mb-3 glow-icon" style={{ color: '#ff6b35' }}></i>
            <h3>Stay Updated</h3>
            <p>Subscribe for tips, updates, and new features.</p>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Button variant="primary" type="submit">
                <i className="bi bi-send me-2"></i>Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Contact Section */}
      <Container className="contact-section py-5 scroll-fade-in">
        <Row className="text-center mb-5">
          <Col>
            <h2>Contact Us</h2>
            <p className="text-muted">Have questions? Get in touch!</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your Name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Your Email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Your Message" />
              </Form.Group>
              <Button variant="primary" type="submit">Send Message</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;