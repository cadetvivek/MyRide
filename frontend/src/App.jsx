// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Assuming this is your custom route

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

import './App.css';

const App = () => {
  const { currentUser, loading } = useAuth(); // add `loading` state if available

  // Show loading spinner while auth state is being determined
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const redirectToDashboard = () => {
    if (currentUser.role === 'User') return '/user-dashboard';
    if (currentUser.role === 'Driver') return '/driver-dashboard';
    if (currentUser.role === 'Admin') return '/admin-dashboard';
    return '/';
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<Home />} />

          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              currentUser ? <Navigate to={redirectToDashboard()} /> : <Login />
            } 
          />
          <Route 
            path="/register" 
            element={
              currentUser ? <Navigate to={redirectToDashboard()} /> : <Register />
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/user-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['User']}>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/driver-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Driver']}>
                <DriverDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
