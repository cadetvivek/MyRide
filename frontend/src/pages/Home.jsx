// src/pages/Home.jsx
import React from 'react';
import { 
  Box, Container, Typography, Button, Grid, Card, CardContent, 
  CardMedia, Paper, Divider, Avatar, Rating
} from '@mui/material';
import { 
  DirectionsBike, Security, Speed, EmojiPeople, 
  LocalOffer, Nature, MonetizationOn
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <Speed color="primary" fontSize="large" />,
      title: "Fast & Convenient",
      description: "Book a bike in seconds and be on your way within minutes."
    },
    {
      icon: <Security color="primary" fontSize="large" />,
      title: "Safe & Secure",
      description: "Our verified drivers and secure payment systems keep you protected."
    },
    {
      icon: <Nature color="primary" fontSize="large" />,
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint while getting where you need to go."
    },
    {
      icon: <MonetizationOn color="primary" fontSize="large" />,
      title: "Cost-Effective",
      description: "Save money compared to traditional transportation options."
    }
  ];

  const testimonials = [
    {
      name: "John Doe",
      role: "Regular Commuter",
      avatar: "/avatars/user1.jpg",
      rating: 5,
      text: "MyRide has completely transformed my daily commute. It's affordable, quick, and I love contributing to a greener planet!"
    },
    {
      name: "Sarah Johnson",
      role: "College Student",
      avatar: "/avatars/user2.jpg",
      rating: 5,
      text: "As a student, MyRide is perfect for getting around campus and the city. The drivers are friendly and the app is super easy to use."
    },
    {
      name: "Michael Chen",
      role: "Business Professional",
      avatar: "/avatars/user3.jpg",
      rating: 4,
      text: "I use MyRide for my business meetings across town. It's reliable, professional, and helps me avoid parking hassles."
    }
  ];

  const getStartedButton = () => {
    if (!currentUser) {
      return (
        <Box className="cta-buttons">
          <Button 
            component={Link} 
            to="/register" 
            variant="contained" 
            size="large" 
            color="primary"
            className="primary-btn"
          >
            Sign Up Now
          </Button>
          <Button 
            component={Link} 
            to="/login" 
            variant="outlined" 
            size="large"
            className="secondary-btn"
          >
            Login
          </Button>
        </Box>
      );
    } else {
      let dashboardLink = '/user-dashboard';
      if (currentUser.role === 'Driver') dashboardLink = '/driver-dashboard';
      if (currentUser.role === 'Admin') dashboardLink = '/admin-dashboard';
      
      return (
        <Box className="cta-buttons">
          <Button 
            component={Link} 
            to={dashboardLink} 
            variant="contained" 
            size="large" 
            color="primary"
            className="primary-btn"
          >
            Go to Dashboard
          </Button>
        </Box>
      );
    }
  };

  return (
    <Box className="home-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom className="hero-title">
                Ride Smart, Ride Green with <span className="text-primary">MyRide</span>
              </Typography>
              <Typography variant="h5" component="div" className="hero-subtitle">
                Book a bike ride in seconds, get picked up in minutes, and enjoy an eco-friendly journey to your destination.
              </Typography>
              {getStartedButton()}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="hero-image-container">
                <img 
                  src="/images/bike-ride-hero.jpg" 
                  alt="Person riding a bike" 
                  className="hero-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1556316384-12c35d30afa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box className="features-section">
        <Container>
          <Box className="section-header">
            <Typography variant="h3" component="h2" className="section-title">
              Why Choose MyRide?
            </Typography>
            <Typography variant="h6" component="div" className="section-subtitle">
              Experience the perfect blend of convenience, affordability, and eco-friendly transportation
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="feature-card">
                  <CardContent className="feature-content">
                    <Box className="feature-icon">
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" className="feature-title">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" className="feature-description">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box className="how-it-works-section">
        <Container>
          <Box className="section-header">
            <Typography variant="h3" component="h2" className="section-title">
              How It Works
            </Typography>
            <Typography variant="h6" component="div" className="section-subtitle">
              Start riding in three simple steps
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Box className="step-box">
                <Box className="step-number">1</Box>
                <Typography variant="h5" component="h3" className="step-title">
                  Book Your Ride
                </Typography>
                <Typography variant="body1" className="step-description">
                  Enter your destination, select a bike type, and confirm your booking.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className="step-box">
                <Box className="step-number">2</Box>
                <Typography variant="h5" component="h3" className="step-title">
                  Meet Your Driver
                </Typography>
                <Typography variant="body1" className="step-description">
                  Your assigned driver will arrive at your location with your bike.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className="step-box">
                <Box className="step-number">3</Box>
                <Typography variant="h5" component="h3" className="step-title">
                  Enjoy Your Journey
                </Typography>
                <Typography variant="body1" className="step-description">
                  Ride to your destination with ease and pay automatically through the app.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box className="section-cta">
            <Button 
              component={Link} 
              to="/register" 
              variant="contained" 
              size="large" 
              color="primary"
              className="cta-button"
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box className="testimonials-section">
        <Container>
          <Box className="section-header">
            <Typography variant="h3" component="h2" className="section-title">
              What Our Users Say
            </Typography>
            <Typography variant="h6" component="div" className="section-subtitle">
              Discover why thousands choose MyRide every day
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper className="testimonial-card">
                  <Box className="testimonial-content">
                    <Box className="testimonial-header">
                      <Avatar 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="testimonial-avatar"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`;
                        }}
                      />
                      <Box className="testimonial-user">
                        <Typography variant="h6" className="testimonial-name">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" className="testimonial-role">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating value={testimonial.rating} readOnly precision={0.5} className="testimonial-rating" />
                    <Typography variant="body1" className="testimonial-text">
                      "{testimonial.text}"
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box className="cta-section">
        <Container>
          <Paper className="cta-container">
            <Grid container spacing={0}>
              <Grid item xs={12} md={8} className="cta-content">
                <Typography variant="h3" component="h2" className="cta-title">
                  Ready to Experience MyRide?
                </Typography>
                <Typography variant="h6" component="div" className="cta-subtitle">
                  Join thousands of satisfied users who have made MyRide their preferred way to travel.
                </Typography>
                <Button 
                  component={Link} 
                  to="/register" 
                  variant="contained" 
                  size="large" 
                  color="primary"
                  className="cta-button"
                >
                  Sign Up for Free
                </Button>
              </Grid>
              <Grid item xs={12} md={4} className="cta-image-container">
                <DirectionsBike className="cta-icon" />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;