import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.API_PATHS.USER.CREATE, // Use the API path from the environment variable
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
