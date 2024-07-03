// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const makePrediction = async (inputData) => {
  try {
    const response = await axios.post(`${API_URL}/predict/`, inputData);
    return response.data;
  } catch (error) {
    console.error('Error making prediction:', error);
    throw error;
  }
};