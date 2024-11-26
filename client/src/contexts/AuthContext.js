import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  // const [isECommerce, setECommerce] = useState(false);


  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('access_token');

      if (token) {
        try {
          const response = await axios.get('/api/verify-token', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.valid) {
            setIsAuthenticated(true);
            setUsername(localStorage.getItem('username'));
          } else {
          // Token is invalid, clear it
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_id');
          localStorage.removeItem('username');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
        }
      }
    };

    checkAuthStatus();
  }, []);

  const login = (token, user) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('user_id', user.id);
    setIsAuthenticated(true);
    setUsername(user.username);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
