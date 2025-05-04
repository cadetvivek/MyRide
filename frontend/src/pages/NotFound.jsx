// src/pages/NotFound.jsx
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './NotFound.css'
const NotFound = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
        className="not-found-container"
      >
        <Typography variant="h1" color="primary" gutterBottom className="not-found-title">
          404
        </Typography>
        <Typography variant="h5" gutterBottom className="not-found-subtitle">
          Page Not Found
        </Typography>
        <Typography variant="body1" paragraph className="not-found-message">
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          color="primary"
          className="go-home-button"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;