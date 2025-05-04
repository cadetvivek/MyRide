// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../api';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setCurrentUser(null);
        } else {
          // Get user profile
          auth.getProfile()
            .then(res => {
              setCurrentUser(res.data);
            })
            .catch(() => {
              localStorage.removeItem('token');
              setCurrentUser(null);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      } catch (error) {
        localStorage.removeItem('token');
        setCurrentUser(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    console.log("response",email,password);

    const response = await auth.login({ email, password });
    console.log("response",response);
    
    const { token } = await response.data;
    console.log("token",token);
    
    await localStorage.setItem('token', token);
    const userProfile = await auth.getProfile();
    setCurrentUser(userProfile.data);
    return userProfile.data;
  };

  const register = async (userData) => {
    const response = await auth.register(userData);
    const { token } = response.data;
    localStorage.setItem('token', token);
    const userProfile = await auth.getProfile();
    setCurrentUser(userProfile.data);
    return userProfile.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);