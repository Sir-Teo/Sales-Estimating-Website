// useAuth.js
import { useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access'); // Change 'token' to 'access'
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
      const response = await apiRegister(userData);
      localStorage.setItem('access', response.access);
      localStorage.setItem('refresh', response.refresh);
      localStorage.setItem('userEmail', userData.email);
      setIsLoggedIn(true);
      setUser(userData.email);
    } catch (err) {
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
