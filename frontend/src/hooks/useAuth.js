import { useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to validate the token with the server here
      setIsLoggedIn(true);
      // Fetch user data if needed
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiLogin({ email: credentials.email, password: credentials.password });
      localStorage.setItem('token', response.access);
      setIsLoggedIn(true);
      setUser(response.user.email);
    } catch (err) {
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiRegister({ email: userData.email, password: userData.password });
      localStorage.setItem('token', response.access);
      setIsLoggedIn(true);
      setUser(response.user.email);
    } catch (err) {
      throw new Error('Registration failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, login, register, logout };
}
