import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { DirectionsCar, LocalTaxi, AirportShuttle, ElectricCar } from '@mui/icons-material';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: <DirectionsCar />,
      title: 'Standard Ride',
      description: 'Comfortable and affordable rides for everyday travel',
      price: 'Starting from $10'
    },
    {
      icon: <LocalTaxi />,
      title: 'Premium Ride',
      description: 'Luxury vehicles with professional drivers',
      price: 'Starting from $20'
    },
    {
      icon: <AirportShuttle />,
      title: 'Airport Transfer',
      description: 'Reliable airport pickups and drop-offs',
      price: 'Starting from $30'
    },
    {
      icon: <ElectricCar />,
      title: 'Electric Vehicle',
      description: 'Eco-friendly rides with electric vehicles',
      price: 'Starting from $15'
    }
  ];

  return (
    <div className="services-page">
      <Container>
        <div className="services-header">
          <Typography variant="h2" className="services-title">
            Our Services
          </Typography>
          <Typography variant="subtitle1" className="services-subtitle">
            Choose from our range of transportation services
          </Typography>
        </div>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="service-card">
                <CardContent>
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <Typography variant="h5" className="service-title">
                    {service.title}
                  </Typography>
                  <Typography variant="body1" className="service-description">
                    {service.description}
                  </Typography>
                  <Typography variant="h6" className="service-price">
                    {service.price}
                  </Typography>
                  <Button
                    variant="contained"
                    className="book-button"
                    fullWidth
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <div className="features-section">
          <Typography variant="h3" className="features-title">
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <div className="feature-box">
                <Typography variant="h5">24/7 Support</Typography>
                <Typography>Round-the-clock customer service</Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="feature-box">
                <Typography variant="h5">Safe Rides</Typography>
                <Typography>Verified drivers and vehicles</Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="feature-box">
                <Typography variant="h5">Easy Booking</Typography>
                <Typography>Simple and quick booking process</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Services; 