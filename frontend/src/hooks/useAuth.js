import { useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    const userEmail = localStorage.getItem('userEmail');
    if (token && userEmail) {
      setIsLoggedIn(true);
      setUser(userEmail);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      localStorage.setItem('access', response.access);
      localStorage.setItem('refresh', response.refresh);
      localStorage.setItem('userEmail', credentials.email);
      setIsLoggedIn(true);
      setUser(credentials.email);
    } catch (err) {
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  };

  const register = async (userData) => {
    try {
      await apiRegister(userData);
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('userEmail');
      setIsLoggedIn(false);
      setUser(null);
      return { success: true, message: 'Registration successful. Please log in.' };
    } catch (err) {
      // Check for specific error messages from the backend
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        if (errorData.password) {
          // If there's a specific password error
          throw new Error(`Registration failed: ${errorData.password[0]}`);
        } else if (errorData.email) {
          // If there's a specific email error
          throw new Error(`Registration failed: ${errorData.email[0]}`);
        } else if (errorData.detail) {
          // If there's a general error message
          throw new Error(`Registration failed: ${errorData.detail}`);
        }
      }
      // If we can't get a specific error, throw a general one
      throw new Error('Registration failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, login, register, logout };
}