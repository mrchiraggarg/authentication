import axios from 'axios';
import { API_PATHS } from '../api/apiPath.js'; // Import the API paths from the constants file
const token = localStorage.getItem('token'); // Get the token from storage

// If the token is not available, it will be undefined
// If the token is available, it will be a string

const axiosInstance = axios.create({
  baseURL: API_PATHS.USER.CREATE, // Use the API path from the environment variable
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  },
});

export default axiosInstance;
