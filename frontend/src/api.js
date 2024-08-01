import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import

const API_URL = 'http://localhost:8000/api';

const getAccessToken = () => localStorage.getItem('access');
const getRefreshToken = () => localStorage.getItem('refresh');

const setTokens = (access, refresh) => {
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
};

const clearTokens = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

const isTokenExpired = (token) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  console.log('Token expiration:', decodedToken.exp, 'Current time:', currentTime);
  return decodedToken.exp < currentTime;
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearTokens();
    return null;
  }
  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken });
    const { access } = response.data;
    localStorage.setItem('access', access);
    console.log('Refreshed access token:', access);
    return access;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    clearTokens();
    return null;
  }
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = getAccessToken();
    if (accessToken && isTokenExpired(accessToken)) {
      accessToken = await refreshAccessToken();
    }
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    config.headers['Content-Type'] = 'application/json'; // Ensure Content-Type is set
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      const accessToken = await refreshAccessToken();
      if (accessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export const makePrediction = async (inputData) => {
  try {
    const userEmail = localStorage.getItem('userEmail');
    const payload = {
      project_name: inputData.project_name,
      inputs: inputData.inputs,
      email: userEmail
    };

    console.log('Prediction request payload:', payload);
    const response = await axiosInstance.post('/predict/', payload);
    console.log('Prediction response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error making prediction:', error.response.data);
    } else {
      console.error('Error making prediction:', error.message);
    }
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login/', { email: credentials.email, password: credentials.password });
    console.log('Login response:', response.data);
    if (response.data.access && response.data.refresh) {
      setTokens(response.data.access, response.data.refresh);
      localStorage.setItem('userEmail', credentials.email); // Store userEmail if needed
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register/', { email: userData.email, password: userData.password });
    console.log('Registration response:', response.data);
    if (response.data.access && response.data.refresh) {
      setTokens(response.data.access, response.data.refresh);
      localStorage.setItem('userEmail', userData.email); // Store userEmail if needed
    }
    return response.data;
  } catch (error) {
    console.error('Error registering:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getSavedPredictions = async () => {
  try {
    const response = await axiosInstance.get('/saved-predictions/');
    console.log('Saved predictions response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized. Please check your credentials.');
    } else {
      console.error('Error fetching saved predictions:', error.response ? error.response.data : error.message);
    }
    throw error;
  }
};

export const deletePrediction = async (id) => {
  try {
    const response = await axiosInstance.delete(`/saved-predictions/${id}/`);
    console.log('Delete prediction response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting prediction:', error.response ? error.response.data : error.message);
    throw error;
  }
};
