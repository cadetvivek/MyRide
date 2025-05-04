import React from 'react';
import { Container, Typography, Grid, Card, CardContent, TextField, Button } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <Container>
        <div className="contact-header">
          <Typography variant="h2" className="contact-title">
            Contact Us
          </Typography>
          <Typography variant="subtitle1" className="contact-subtitle">
            Get in touch with our team for any questions or support
          </Typography>
        </div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card className="contact-card">
              <CardContent>
                <div className="contact-info">
                  <div className="contact-icon">
                    <Email />
                  </div>
                  <div className="contact-details">
                    <Typography variant="h6">Email</Typography>
                    <Typography>support@myride.com</Typography>
                  </div>
                </div>

                <div className="contact-info">
                  <div className="contact-icon">
                    <Phone />
                  </div>
                  <div className="contact-details">
                    <Typography variant="h6">Phone</Typography>
                    <Typography>+1 (555) 123-4567</Typography>
                  </div>
                </div>

                <div className="contact-info">
                  <div className="contact-icon">
                    <LocationOn />
                  </div>
                  <div className="contact-details">
                    <Typography variant="h6">Address</Typography>
                    <Typography>123 Main Street, City, Country</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card className="contact-form">
              <CardContent>
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          className="form-control"
                          placeholder="Enter your first name"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          className="form-control"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          className="form-control"
                          placeholder="Enter your email"
                          type="email"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="form-group">
                        <label className="form-label">Subject</label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          className="form-control"
                          placeholder="Enter subject"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="form-group">
                        <label className="form-label">Message</label>
                        <TextField
                          fullWidth
                          variant="outlined"
                          className="form-control"
                          placeholder="Enter your message"
                          multiline
                          rows={4}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        className="submit-button"
                        fullWidth
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>

                <div className="social-links">
                  <a href="#" className="social-link">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Contact; 