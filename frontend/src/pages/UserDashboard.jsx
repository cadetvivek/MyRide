// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useAuth } from '../context/AuthContext';
import { rides } from '../api';
import {
  Box, Typography, Paper, Button, Grid, CircularProgress,
  Card, CardContent, Divider, Container, Alert, IconButton
} from '@mui/material';
import { LocationOn, MyLocation, DirectionsRun, LocalTaxi, Cancel } from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import io from 'socket.io-client';
import './UserDashboard.css'

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icon for user location
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for destination
const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for driver
const driverIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Map click handler component
function LocationMarker({ setPickup, setDropoff, markerType }) {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (markerType === 'pickup') {
        setPickup({ lat, lng });
      } else if (markerType === 'dropoff') {
        setDropoff({ lat, lng });
      }
    },
  });
  
  return null;
}

// Get user's current location
function CurrentLocationButton({ setPickup, setCenter }) {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setPickup({ lat, lng });
        setCenter({ lat, lng });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<MyLocation />}
      onClick={handleClick}
      sx={{ mb: 2 }}
    >
      Use My Location
    </Button>
  );
}

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [estimatedFare, setEstimatedFare] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [currentRide, setCurrentRide] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [socket, setSocket] = useState(null);
  const [markerType, setMarkerType] = useState('pickup');

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  // Listen for driver location updates
  useEffect(() => {
    if (socket && currentRide) {
      socket.on('driverLocationUpdate', (data) => {
        if (data.rideId === currentRide._id) {
          setDriverLocation(data.location);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('driverLocationUpdate');
      }
    };
  }, [socket, currentRide]);

  // Calculate fare when pickup and dropoff are selected
  useEffect(() => {
    if (pickup && dropoff) {
      // Calculate distance (simple Euclidean distance for demonstration)
      const distance = Math.sqrt(
        Math.pow(pickup.lat - dropoff.lat, 2) + Math.pow(pickup.lng - dropoff.lng, 2)
      );
      
      // Calculate fare (based on backend logic)
      const fare = distance * 10;
      setEstimatedFare(fare.toFixed(2));
    } else {
      setEstimatedFare(null);
    }
  }, [pickup, dropoff]);

  const handleBookRide = async () => {
    if (!pickup || !dropoff) {
      setBookingError('Please select pickup and drop-off locations');
      return;
    }

    setLoading(true);
    setBookingError('');

    try {
      const response = await rides.bookRide({
        pickup,
        dropoff
      });
      
      setCurrentRide(response.data);
      setLoading(false);
    } catch (error) {
      // Handle specific error messages from the backend
      const errorMessage = error.response?.data?.error || 'Failed to book ride';
      setBookingError(errorMessage);
      
      // If the error is about no drivers, show a more user-friendly message
      if (errorMessage.includes('No drivers') || errorMessage.includes('busy')) {
        setBookingError('No drivers are currently available. Please try again in a few minutes.');
      }
      
      setLoading(false);
    }
  };

  const handleCancelRide = async () => {
    if (!currentRide) return;

    setLoading(true);
    try {
      await rides.cancelRide(currentRide._id);
      setCurrentRide(null);
      setPickup(null);
      setDropoff(null);
      setEstimatedFare(null);
      setDriverLocation(null);
      setLoading(false);
    } catch (error) {
      console.error('Failed to cancel ride:', error);
      setLoading(false);
    }
  };

  const selectPickupMode = () => {
    setMarkerType('pickup');
  };

  const selectDropoffMode = () => {
    setMarkerType('dropoff');
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {currentUser?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Book a ride by selecting your pickup and drop-off locations on the map.
        </Typography>

        {bookingError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {bookingError}
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
                
                <LocationMarker 
                  setPickup={setPickup} 
                  setDropoff={setDropoff} 
                  markerType={markerType} 
                />
                
                {pickup && (
                  <Marker position={[pickup.lat, pickup.lng]} icon={userIcon}>
                    <Popup>Pickup Location</Popup>
                  </Marker>
                )}
                
                {dropoff && (
                  <Marker position={[dropoff.lat, dropoff.lng]} icon={destinationIcon}>
                    <Popup>Drop-off Location</Popup>
                  </Marker>
                )}
                
                {driverLocation && (
                  <Marker position={[driverLocation.lat, driverLocation.lng]} icon={driverIcon}>
                    <Popup>Your Driver</Popup>
                  </Marker>
                )}
              </MapContainer>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LocationOn />}
                onClick={selectPickupMode}
                sx={{ mr: 1 }}
              >
                Set Pickup
              </Button>
              
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DirectionsRun />}
                onClick={selectDropoffMode}
              >
                Set Destination
              </Button>
              
              <CurrentLocationButton setPickup={setPickup} setCenter={setCenter} />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
              {!currentRide ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Ride Details
                  </Typography>
                  
                  <Card variant="outlined" sx={{ mb: 2, bgcolor: 'background.default' }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        Pickup Location
                      </Typography>
                      <Typography variant="body2">
                        {pickup ? `Lat: ${pickup.lat.toFixed(4)}, Lng: ${pickup.lng.toFixed(4)}` : 'Not selected'}
                      </Typography>
                      
                      <Divider sx={{ my: 1.5 }} />
                      
                      <Typography variant="subtitle2" color="text.secondary">
                        Drop-off Location
                      </Typography>
                      <Typography variant="body2">
                        {dropoff ? `Lat: ${dropoff.lat.toFixed(4)}, Lng: ${dropoff.lng.toFixed(4)}` : 'Not selected'}
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  {estimatedFare && (
                    <Card variant="outlined" sx={{ mb: 3, bgcolor: 'success.light', color: 'white' }}>
                      <CardContent>
                        <Typography variant="h6">
                          Estimated Fare
                        </Typography>
                        <Typography variant="h4">
                          ${estimatedFare}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                  
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!pickup || !dropoff || loading}
                    onClick={handleBookRide}
                    startIcon={<LocalTaxi />}
                    sx={{ mt: 2 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Book Ride'}
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6" gutterBottom>
                    Current Ride
                  </Typography>
                  
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Ride Status: {currentRide.status}
                  </Alert>
                  
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        Driver
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {currentRide.driver?.name || 'Driver info loading...'}
                      </Typography>
                      
                      <Divider sx={{ my: 1.5 }} />
                      
                      <Typography variant="subtitle2" color="text.secondary">
                        Fare
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        ${currentRide.fare.toFixed(2)}
                      </Typography>
                      
                      <Divider sx={{ my: 1.5 }} />
                      
                      <Typography variant="subtitle2" color="text.secondary">
                        Booked At
                      </Typography>
                      <Typography variant="body2">
                        {new Date(currentRide.createdAt).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={handleCancelRide}
                    disabled={loading || currentRide.status === 'Completed'}
                    startIcon={<Cancel />}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Cancel Ride'}
                  </Button>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserDashboard;