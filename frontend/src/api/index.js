// src/api/index.js
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post(`/auth/login`, credentials),
  getProfile: () => api.get('/auth/profile'),
};

export const rides = {
  bookRide: (rideData) => api.post('/ride/book', rideData),
  getRide: (id) => api.get(`/ride/${id}`),
  cancelRide: (id) => api.post(`/ride/cancel/${id}`),
  completeRide: (id) => api.post(`/ride/complete/${id}`),
  updateLocation: (location) => api.post('/ride/update-location', location),
};

export default api;