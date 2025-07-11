import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, 
  Menu, MenuItem, Avatar, Container, Drawer, List, 
  ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import { 
  Menu as MenuIcon, DirectionsBike, Person, Login, 
  PersonAdd, Dashboard, Logout, KeyboardArrowDown
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = async () => {
    await logout();
    handleUserMenuClose();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getDashboardLink = () => {
    if (!currentUser) return '/login';
    switch(currentUser.role) {
      case 'User': return '/user-dashboard';
      case 'Driver': return '/driver-dashboard';
      case 'Admin': return '/admin-dashboard';
      default: return '/login';
    }
  };

  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="xl">
        <Toolbar className="navbar-toolbar">
          {/* Logo */}
          <Box className="logo-container">
            <DirectionsBike className="logo-icon" />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              className="logo-text"
            >
              MyRide
            </Typography>
          </Box>

          {/* Mobile Menu Icon */}
          <Box className="mobile-menu-icon">
            <IconButton onClick={toggleMobileMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Desktop Nav Links */}
          <Box className="nav-links-desktop">
            <Button component={Link} to="/" className="nav-button">Home</Button>
            <Button component={Link} to="/about" className="nav-button">About</Button>
            <Button component={Link} to="/services" className="nav-button">Services</Button>
            <Button component={Link} to="/contact" className="nav-button">Contact</Button>
          </Box>

          {/* User Menu (Desktop) */}
          <Box className="user-menu-desktop">
            {currentUser ? (
              <>
                <Button 
                  color="inherit"
                  onClick={handleUserMenuClick}
                  endIcon={<KeyboardArrowDown />}
                  className="user-button"
                >
                  <Avatar 
                    alt={currentUser?.name || 'User'} 
                    src="/avatar.png" 
                    className="user-avatar"
                  />
                  <Typography variant="body1">
                    {currentUser?.name || 'User'}
                  </Typography>
                </Button>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem 
                    component={Link} 
                    to={getDashboardLink()}
                    onClick={handleUserMenuClose}
                  >
                    <ListItemIcon><Dashboard fontSize="small" /></ListItemIcon>
                    Dashboard
                  </MenuItem>
                  <MenuItem 
                    component={Link} 
                    to="/profile"
                    onClick={handleUserMenuClose}
                  >
                    <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  startIcon={<Login />}
                  className="login-button"
                >
                  Login
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  component={Link} 
                  to="/register"
                  startIcon={<PersonAdd />}
                  className="register-button"
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <Box className="mobile-drawer" onClick={toggleMobileMenu}>
          <Box className="mobile-drawer-header">
            <DirectionsBike className="drawer-logo-icon" />
            <Typography variant="h6">MyRide</Typography>
          </Box>
          <Divider />
          <List>
            <ListItem button component={Link} to="/"><ListItemText primary="Home" /></ListItem>
            <ListItem button component={Link} to="/about"><ListItemText primary="About" /></ListItem>
            <ListItem button component={Link} to="/services"><ListItemText primary="Services" /></ListItem>
            <ListItem button component={Link} to="/contact"><ListItemText primary="Contact" /></ListItem>
          </List>
          <Divider />
          <List>
            {currentUser ? (
              <>
                <ListItem button component={Link} to={getDashboardLink()}>
                  <ListItemIcon><Dashboard /></ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/profile">
                  <ListItemIcon><Person /></ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon><Logout /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to="/login">
                  <ListItemIcon><Login /></ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={Link} to="/register">
                  <ListItemIcon><PersonAdd /></ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;