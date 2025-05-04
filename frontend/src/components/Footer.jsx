// // src/components/Footer.jsx
// import React from 'react';
// import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
// import { 
//   DirectionsBike, Facebook, Twitter, Instagram, LinkedIn, 
//   Email, Phone, LocationOn
// } from '@mui/icons-material';
// import { Link as RouterLink } from 'react-router-dom';
// import './Footer.css';

// const Footer = () => {
//   const year = new Date().getFullYear();

//   return (
//     <Box component="footer" className="footer">
//       <Container maxWidth="lg">
//         <Grid container spacing={5}>
//           {/* Brand Info */}
//           <Grid item xs={12} md={4}>
//             <Box className="footer-brand">
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <DirectionsBike sx={{ fontSize: '2.5rem', mr: 1 }} />
//                 <Typography variant="h4" component="div" fontWeight="bold">
//                   MyRide
//                 </Typography>
//               </Box>
//               <Typography variant="body1" color="text.secondary" paragraph>
//                 MyRide is your go-to bike ride-sharing platform, connecting you with convenient, 
//                 eco-friendly transportation options in your area.
//               </Typography>
//               <Box className="social-icons">
//                 <IconButton color="primary" aria-label="facebook">
//                   <Facebook />
//                 </IconButton>
//                 <IconButton color="primary" aria-label="twitter">
//                   <Twitter />
//                 </IconButton>
//                 <IconButton color="primary" aria-label="instagram">
//                   <Instagram />
//                 </IconButton>
//                 <IconButton color="primary" aria-label="linkedin">
//                   <LinkedIn />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Grid>

//           {/* Quick Links */}
//           <Grid item xs={12} sm={6} md={2}>
//             <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
//               Quick Links
//             </Typography>
//             <ul className="footer-links">
//               <li>
//                 <Link component={RouterLink} to="/" color="inherit">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link component={RouterLink} to="/about" color="inherit">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link component={RouterLink} to="/services" color="inherit">
//                   Services
//                 </Link>
//               </li>
//               <li>
//                 <Link component={RouterLink} to="/contact" color="inherit">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </Grid>

//           {/* Support */}
//           <Grid item xs={12} sm={6} md={3}>
//             <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
//               Support
//             </Typography>
//             <ul className="footer-links">
//               <li>
//                 <Link component={RouterLink} to="/faq" color="inherit">
//                   FAQ
//                 </Link>
//               </li>
//               <li>
//                 <Link component={RouterLink} to="/privacy-policy" color="inherit">
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link component={RouterLink} to="/terms" color="inherit">
//                   Terms & Conditions
//                 </Link>
//               </li>
//               <li>
//                 <Link component={RouterLink} to="/help" color="inherit">
//                   Help Center
//                 </Link>
//               </li>
//             </ul>
//           </Grid>

//           {/* Contact */}
//           <Grid item xs={12} md={3}>
//             <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
//               Contact Us
//             </Typography>
//             <Box className="contact-info">
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <LocationOn sx={{ mr: 1 }} color="primary" />
//                 <Typography variant="body2">
//                   123 Bike Street, Ride City, RC 10001
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Email sx={{ mr: 1 }} color="primary" />
//                 <Typography variant="body2">
//                   <Link href="mailto:info@myride.com" color="inherit">
//                     info@myride.com
//                   </Link>
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Phone sx={{ mr: 1 }} color="primary" />
//                 <Typography variant="body2">
//                   <Link href="tel:+1234567890" color="inherit">
//                     +1 (234) 567-890
//                   </Link>
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />
        
//         {/* Copyright */}
//         <Box className="copyright" textAlign="center" pt={2} pb={3}>
//           <Typography variant="body2" color="text.secondary">
//             © {year} MyRide. All rights reserved.
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { 
  DirectionsBike, Facebook, Twitter, Instagram, LinkedIn, 
  Email, Phone, LocationOn 
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <Box className="footer-brand">
              <Box className="footer-logo">
                <DirectionsBike className="logo-icon" />
                <Typography variant="h4" component="div" className="brand-name">
                  MyRide
                </Typography>
              </Box>
              <Typography variant="body1" className="brand-description">
                MyRide is your go-to bike ride-sharing platform, connecting you with convenient, 
                eco-friendly transportation options in your area.
              </Typography>
              <Box className="social-icons">
                <IconButton aria-label="facebook"><Facebook /></IconButton>
                <IconButton aria-label="twitter"><Twitter /></IconButton>
                <IconButton aria-label="instagram"><Instagram /></IconButton>
                <IconButton aria-label="linkedin"><LinkedIn /></IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" className="footer-heading">Quick Links</Typography>
            <ul className="footer-links">
              <li><Link component={RouterLink} to="/">Home</Link></li>
              <li><Link component={RouterLink} to="/about">About Us</Link></li>
              <li><Link component={RouterLink} to="/services">Services</Link></li>
              <li><Link component={RouterLink} to="/contact">Contact</Link></li>
            </ul>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-heading">Support</Typography>
            <ul className="footer-links">
              <li><Link component={RouterLink} to="/faq">FAQ</Link></li>
              <li><Link component={RouterLink} to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link component={RouterLink} to="/terms">Terms & Conditions</Link></li>
              <li><Link component={RouterLink} to="/help">Help Center</Link></li>
            </ul>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" className="footer-heading">Contact Us</Typography>
            <Box className="contact-info">
              <Box className="contact-item">
                <LocationOn className="contact-icon" />
                <Typography variant="body2">
                  123 Bike Street, Ride City, RC 10001
                </Typography>
              </Box>
              <Box className="contact-item">
                <Email className="contact-icon" />
                <Typography variant="body2">
                  <Link href="mailto:info@myride.com">info@myride.com</Link>
                </Typography>
              </Box>
              <Box className="contact-item">
                <Phone className="contact-icon" />
                <Typography variant="body2">
                  <Link href="tel:+1234567890">+1 (234) 567-890</Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider className="footer-divider" />
        
        {/* Copyright */}
        <Box className="footer-bottom">
          <Typography variant="body2">
            © {year} MyRide. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
