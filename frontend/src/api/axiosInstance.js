import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.API_PATHS.USER.CREATE, // Use the API path from the environment variable
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
