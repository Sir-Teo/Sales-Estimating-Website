import { useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (err) {
        console.error('Error parsing user from localStorage', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const loginResponse = await apiLogin(credentials);
      setUser(loginResponse.user);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(loginResponse.user));
    } catch (err) {
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  };

  const register = async (userData) => {
    try {
      const registrationResponse = await apiRegister(userData);
      setUser(registrationResponse.user);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(registrationResponse.user));
    } catch (err) {
      throw new Error('Registration failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return { isLoggedIn, user, login, register, logout };
}