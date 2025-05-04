// src/pages/DriverDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAuth } from '../context/AuthContext';
import { rides } from '../api';
import {
  Box, Typography, Paper, Button, Grid, CircularProgress,
  Card, CardContent, Divider, Container, Alert, List, ListItem,
  ListItemText, ListItemSecondaryAction, IconButton
} from '@mui/material';
import { Check, MyLocation, DirectionsRun, Close } from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import io from 'socket.io-client';
import './DriverDashboard.css';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const driverIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const pickupIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const dropoffIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const DriverDashboard = () => {
  const { currentUser } = useAuth();
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [activeRides, setActiveRides] = useState([]);
  const [currentRide, setCurrentRide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [socket, setSocket] = useState(null);
  const [locationUpdateInterval, setLocationUpdateInterval] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  // Get driver's current location
  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setCurrentLocation({ lat, lng });
        setCenter({ lat, lng });
        
        // Update location in backend if logged in and we have an active ride
        if (currentUser && currentRide) {
          rides.updateLocation({ lat, lng })
            .then(() => {
              // Emit location update to socket
              if (socket && currentRide) {
                socket.emit('driverLocationUpdate', {
                  rideId: currentRide._id,
                  location: { lat, lng }
                });
              }
            })
            .catch(err => console.error('Failed to update location:', err));
        }
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, [currentUser, currentRide, socket]);

  // Get current location on component mount
  useEffect(() => {
    getCurrentLocation();
    
    // Setup interval to update location
    const interval = setInterval(getCurrentLocation, 10000); // Update every 10 seconds
    setLocationUpdateInterval(interval);
    
    return () => {
      clearInterval(interval);
    };
  }, [getCurrentLocation]);

  // Fetch active rides
  const fetchActiveRides = useCallback(async () => {
    try {
      // This would be an API call to fetch active rides near the driver
      // For demonstration, we'll assume the endpoint returns all pending rides
      const response = await fetch('http://localhost:3000/ride/available', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setActiveRides(data);
      }
    } catch (err) {
      console.error('Failed to fetch active rides:', err);
    }
  }, []);

  // Fetch active rides and check for current ride on component mount
  useEffect(() => {
    const checkCurrentRide = async () => {
      try {
        // This would be an API call to check if driver has an active ride
        const response = await fetch('http://localhost:3000/ride/current', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data && data._id) {
            setCurrentRide(data);
          } else {
            fetchActiveRides();
          }
        }
      } catch (err) {
        console.error('Failed to check current ride:', err);
        fetchActiveRides();
      }
    };
    
    checkCurrentRide();
  }, [fetchActiveRides]);

  // Complete the current ride
  const handleCompleteRide = async () => {
    if (!currentRide) return;
    
    setLoading(true);
    try {
      await rides.completeRide(currentRide._id);
      setCurrentRide(null);
      setLoading(false);
      fetchActiveRides();
    } catch (err) {
      setError('Failed to complete ride');
      setLoading(false);
    }
  };

  // Accept a ride request
  const handleAcceptRide = async (rideId) => {
    setLoading(true);
    try {
      // This would be an API call to accept a ride
      const response = await fetch(`http://localhost:3000/ride/accept/${rideId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const ride = await response.json();
        setCurrentRide(ride);
        setActiveRides([]);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to accept ride');
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom className="dashboard-title">
          Driver Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {currentUser?.isAvailable ? 
            'You are currently available for rides.' : 
            'You are currently on a ride.'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                height: 'calc(100vh - 200px)',
                minHeight: '500px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2
              }}
              className="map-container"
            >
              <MapContainer
                center={[center.lat, center.lng]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {currentLocation && (
                  <Marker position={[currentLocation.lat, currentLocation.lng]} icon={driverIcon}>
                    <Popup>Your Location</Popup>
                  </Marker>
                )}
                
                {currentRide && currentRide.pickup && (
                  <Marker position={[currentRide.pickup.lat, currentRide.pickup.lng]} icon={pickupIcon}>
                    <Popup>Pickup Location</Popup>
                  </Marker>
                )}
                
                {currentRide && currentRide.dropoff && (
                  <Marker position={[currentRide.dropoff.lat, currentRide.dropoff.lng]} icon={dropoffIcon}>
                    <Popup>Drop-off Location</Popup>
                  </Marker>
                )}
              </MapContainer>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<MyLocation />}
                onClick={getCurrentLocation}
                className="location-button"
              >
                Update My Location
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }} className="driver-info-panel">
              <Typography variant="h6" gutterBottom>
                {currentUser ? `Hello, ${currentUser.name}` : 'Loading...'}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Current Status
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {currentRide ? (
                  <span className="status-badge ongoing">On Ride</span>
                ) : (
                  <span className="status-badge available">Available</span>
                )}
              </Typography>
              
              {currentLocation && (
                <>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Your Location
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
                  </Typography>
                </>
              )}
            </Paper>
            
            {currentRide ? (
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }} className="active-ride-panel">
                <Typography variant="h6" gutterBottom>
                  Current Ride
                </Typography>
                
                <Alert severity="info" sx={{ mb: 2 }}>
                  Ride Status: {currentRide.status}
                </Alert>
                
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      User
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {currentRide.user?.name || 'User info loading...'}
                    </Typography>
                    
                    <Divider sx={{ my: 1.5 }} />
                    
                    <Typography variant="subtitle2" color="text.secondary">
                      Pickup
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {currentRide.pickup ? `Lat: ${currentRide.pickup.lat.toFixed(4)}, Lng: ${currentRide.pickup.lng.toFixed(4)}` : 'Loading...'}
                    </Typography>
                    
                    <Divider sx={{ my: 1.5 }} />
                    
                    <Typography variant="subtitle2" color="text.secondary">
                      Dropoff
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {currentRide.dropoff ? `Lat: ${currentRide.dropoff.lat.toFixed(4)}, Lng: ${currentRide.dropoff.lng.toFixed(4)}` : 'Loading...'}
                    </Typography>
                    
                    <Divider sx={{ my: 1.5 }} />
                    
                    <Typography variant="subtitle2" color="text.secondary">
                      Fare
                    </Typography>
                    <Typography variant="body1" gutterBottom className="fare-value">
                      ${currentRide.fare ? currentRide.fare.toFixed(2) : '0.00'}
                    </Typography>
                  </CardContent>
                </Card>
                
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleCompleteRide}
                  disabled={loading || currentRide.status === 'Completed'}
                  startIcon={<Check />}
                  className="complete-button"
                >
                  {loading ? <CircularProgress size={24} /> : 'Complete Ride'}
                </Button>
              </Paper>
            ) : (
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }} className="available-rides-panel">
                <Typography variant="h6" gutterBottom>
                  Available Rides
                </Typography>
                
                {activeRides.length === 0 ? (
                  <Alert severity="info">
                    No rides available at the moment.
                  </Alert>
                ) : (
                  <List>
                    {activeRides.map(ride => (
                      <ListItem key={ride._id} divider className="ride-list-item">
                        <ListItemText
                          primary={`From: ${ride.pickup.lat.toFixed(4)}, ${ride.pickup.lng.toFixed(4)}`}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                To: {ride.dropoff.lat.toFixed(4)}, {ride.dropoff.lng.toFixed(4)}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2">
                                ${ride.fare.toFixed(2)}
                              </Typography>
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                            edge="end" 
                            color="primary"
                            onClick={() => handleAcceptRide(ride._id)}
                            disabled={loading}
                          >
                            <Check />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DriverDashboard;