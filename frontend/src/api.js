// src/api.js
import axios from 'axios';

//const API_URL = 'http://10.0.0.14:8000/api';
const API_URL = 'http://localhost:8000/api';

export const makePrediction = async (inputData) => {
  try {
    const response = await axios.post(`${API_URL}/predict/`, inputData);
    console.log('Prediction response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error making prediction:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login/`, credentials);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register/`, userData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};