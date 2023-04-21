import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const axiosConfig = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

const axiosClient = axios.create(axiosConfig);

export default axiosClient;