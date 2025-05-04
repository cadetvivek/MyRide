// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css'
// Material UI Components
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  IconButton,
  Alert,
  Chip
} from '@mui/material';

// Material UI Icons
import {
  Refresh,
  Delete,
  Block,
  CheckCircle,
  Person,
  DirectionsCar,
  LocalTaxi,
  AttachMoney
} from '@mui/icons-material';

/**
 * Admin Dashboard Component
 * Provides management interface for users, drivers, and rides
 */
const AdminDashboard = () => {
  // Auth context
  const { currentUser } = useAuth();
  
  // Tab state
  const [tabValue, setTabValue] = useState(0);
  
  // Data states
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [rides, setRides] = useState([]);
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Statistics state
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalRides: 0,
    completedRides: 0,
    cancelledRides: 0,
    totalRevenue: 0
  });

  /**
   * Handle tab change
   */
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  /**
   * Fetch admin dashboard data
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch users (role=User)
      const usersResponse = await fetch('http://localhost:3000/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Fetch drivers (role=Driver)
      const driversResponse = await fetch('http://localhost:3000/admin/drivers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Fetch all rides
      const ridesResponse = await fetch('http://localhost:3000/admin/rides', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Fetch dashboard statistics
      const statsResponse = await fetch('http://localhost:3000/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Handle responses
      if (usersResponse.ok && driversResponse.ok && ridesResponse.ok && statsResponse.ok) {
        const usersData = await usersResponse.json();
        const driversData = await driversResponse.json();
        const ridesData = await ridesResponse.json();
        const statsData = await statsResponse.json();
        
        setUsers(usersData);
        setDrivers(driversData);
        setRides(ridesData);
        setStats(statsData);
      } else {
        // Set error if any of the requests failed
        setError('Failed to fetch data. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch data on component mount
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Handle refresh button click
   */
  const handleRefresh = () => {
    fetchData();
  };

  /**
   * Handle blocking/unblocking a user
   */
  const handleToggleUserBlock = async (userId, isCurrentlyBlocked) => {
    try {
      const action = isCurrentlyBlocked ? 'unblock' : 'block';
      const response = await fetch(`http://localhost:3000/admin/users/${userId}/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setSuccessMessage(`User ${isCurrentlyBlocked ? 'unblocked' : 'blocked'} successfully`);
        
        // Update users list
        setUsers(users.map(user => 
          user._id === userId ? { ...user, isBlocked: !isCurrentlyBlocked } : user
        ));
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to update user status');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Network error. Please try again.');
    }
  };

  /**
   * Handle deleting a user
   */
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        setSuccessMessage('User deleted successfully');
        
        // Update users and drivers lists
        setUsers(users.filter(user => user._id !== userId));
        setDrivers(drivers.filter(driver => driver._id !== userId));
        
        // Update stats
        setStats(prev => ({
          ...prev,
          totalUsers: prev.totalUsers - 1
        }));
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Network error. Please try again.');
    }
  };

  /**
   * Render dashboard statistics cards
   */
  const renderStatsCards = () => (
    <Grid container spacing={3} sx={{ mb: 4 }} className="stats-container">
      <Grid item xs={12} sm={6} md={3}>
        <Card className="stat-card user-stat">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Person color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="text.secondary">
                Total Users
              </Typography>
            </Box>
            <Typography variant="h4" className="stat-value">
              {stats.totalUsers}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card className="stat-card driver-stat">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <DirectionsCar color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="text.secondary">
                Total Drivers
              </Typography>
            </Box>
            <Typography variant="h4" className="stat-value">
              {stats.totalDrivers}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card className="stat-card ride-stat">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocalTaxi color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="text.secondary">
                Total Rides
              </Typography>
            </Box>
            <Typography variant="h4" className="stat-value">
              {stats.totalRides}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed: {stats.completedRides} | Cancelled: {stats.cancelledRides}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card className="stat-card revenue-stat">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AttachMoney color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="text.secondary">
                Total Revenue
              </Typography>
            </Box>
            <Typography variant="h4" className="stat-value">
              ${stats.totalRevenue.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  /**
   * Render users tab content
   */
  const renderUsersTab = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell width="150">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">No users found</TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id} className="user-row">
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.isBlocked ? "Blocked" : "Active"} 
                    color={user.isBlocked ? "error" : "success"}
                    size="small"
                    className={`status-chip ${user.isBlocked ? 'blocked' : 'active'}`}
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleToggleUserBlock(user._id, user.isBlocked)}
                    color={user.isBlocked ? "primary" : "warning"}
                    title={user.isBlocked ? "Unblock User" : "Block User"}
                    className="action-button"
                  >
                    {user.isBlocked ? <CheckCircle /> : <Block />}
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDeleteUser(user._id)}
                    color="error"
                    title="Delete User"
                    className="action-button"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  /**
   * Render drivers tab content
   */
  const renderDriversTab = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Location</TableCell>
            <TableCell width="150">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">No drivers found</TableCell>
            </TableRow>
          ) : (
            drivers.map((driver) => (
              <TableRow key={driver._id} className="driver-row">
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={driver.isBlocked ? "Blocked" : (driver.isAvailable ? "Available" : "On Ride")} 
                    color={driver.isBlocked ? "error" : (driver.isAvailable ? "success" : "warning")}
                    size="small"
                    className={`status-chip ${driver.isBlocked ? 'blocked' : (driver.isAvailable ? 'available' : 'on-ride')}`}
                  />
                </TableCell>
                <TableCell>
                  {driver.location ? 
                    `${driver.location.lat.toFixed(4)}, ${driver.location.lng.toFixed(4)}` : 
                    'Unknown'}
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleToggleUserBlock(driver._id, driver.isBlocked)}
                    color={driver.isBlocked ? "primary" : "warning"}
                    title={driver.isBlocked ? "Unblock Driver" : "Block Driver"}
                    className="action-button"
                  >
                    {driver.isBlocked ? <CheckCircle /> : <Block />}
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDeleteUser(driver._id)}
                    color="error"
                    title="Delete Driver"
                    className="action-button"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  /**
   * Render rides tab content
   */
  const renderRidesTab = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Fare</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rides.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">No rides found</TableCell>
            </TableRow>
          ) : (
            rides.map((ride) => (
              <TableRow key={ride._id} className="ride-row">
                <TableCell>{ride._id.substring(0, 8)}...</TableCell>
                <TableCell>{ride.user?.name || 'Unknown'}</TableCell>
                <TableCell>{ride.driver?.name || 'Unassigned'}</TableCell>
                <TableCell>
                  <Chip 
                    label={ride.status} 
                    color={
                      ride.status === 'Completed' ? 'success' : 
                      ride.status === 'Cancelled' ? 'error' : 
                      ride.status === 'Pending' ? 'warning' : 
                      'info'
                    }
                    size="small"
                    className={`status-chip status-${ride.status.toLowerCase()}`}
                  />
                </TableCell>
                <TableCell>${ride.fare.toFixed(2)}</TableCell>
                <TableCell>{new Date(ride.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  /**
   * Tab Panel component
   */
  const TabPanel = ({ children, value, index }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className="tab-panel"
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );

  return (
    <Container className="admin-dashboard">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Dashboard Header */}
        <Box sx={{ mb: 4 }} className="dashboard-header">
          <Typography variant="h4" gutterBottom className="dashboard-title">
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph className="dashboard-subtitle">
            Manage users, drivers, and monitor ride activity
          </Typography>
        </Box>

        {/* Success/Error Messages */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }} className="status-alert">
            {successMessage}
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} className="status-alert">
            {error}
          </Alert>
        )}

        {/* Statistics Cards */}
        {renderStatsCards()}

        {/* Main Tabs Panel */}
        <Paper elevation={3} sx={{ mb: 4 }} className="main-panel">
          {/* Tab Header */}
          <Box 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              px: 2 
            }}
            className="tab-header"
          >
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="admin tabs"
              className="tab-navigation"
            >
              <Tab label="Users" id="tab-0" />
              <Tab label="Drivers" id="tab-1" />
              <Tab label="Rides" id="tab-2" />
            </Tabs>
            <IconButton 
              onClick={handleRefresh} 
              disabled={loading}
              className="refresh-button"
            >
              <Refresh />
            </IconButton>
          </Box>
          
          {/* Tab Content */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }} className="loading-container">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TabPanel value={tabValue} index={0}>
                {renderUsersTab()}
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                {renderDriversTab()}
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                {renderRidesTab()}
              </TabPanel>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard;