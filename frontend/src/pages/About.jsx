import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <Container>
        <div className="about-header">
          <Typography variant="h2" className="about-title">
            About Us
          </Typography>
          <Typography variant="subtitle1" className="about-subtitle">
            Learn more about our mission and the team behind MyRide
          </Typography>
        </div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card className="about-section">
              <CardContent>
                <Typography variant="h4" className="section-title">
                  Our Mission
                </Typography>
                <Typography variant="body1" className="section-content">
                  At MyRide, we're dedicated to revolutionizing the way people travel. Our mission is to provide safe, reliable, and convenient transportation solutions that connect people with their destinations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="about-section">
              <CardContent>
                <Typography variant="h4" className="section-title">
                  Our Vision
                </Typography>
                <Typography variant="body1" className="section-content">
                  We envision a future where transportation is seamless, accessible, and environmentally friendly. Through innovation and technology, we're building a platform that makes getting around easier for everyone.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h3" className="section-title" style={{ textAlign: 'center', marginTop: '2rem' }}>
              Meet Our Team
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className="team-member">
              <CardContent>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="team-member-image"
                />
                <Typography variant="h5" className="team-member-name">
                  John Doe
                </Typography>
                <Typography variant="subtitle1" className="team-member-role">
                  CEO & Founder
                </Typography>
                <Typography variant="body2" className="team-member-bio">
                  With over 10 years of experience in the transportation industry, John leads our team with vision and innovation.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className="team-member">
              <CardContent>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="team-member-image"
                />
                <Typography variant="h5" className="team-member-name">
                  Jane Smith
                </Typography>
                <Typography variant="subtitle1" className="team-member-role">
                  CTO
                </Typography>
                <Typography variant="body2" className="team-member-bio">
                  Jane brings her technical expertise to ensure our platform remains cutting-edge and user-friendly.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className="team-member">
              <CardContent>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="team-member-image"
                />
                <Typography variant="h5" className="team-member-name">
                  Mike Johnson
                </Typography>
                <Typography variant="subtitle1" className="team-member-role">
                  Head of Operations
                </Typography>
                <Typography variant="body2" className="team-member-bio">
                  Mike ensures smooth operations and excellent service delivery across our network.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default About; 