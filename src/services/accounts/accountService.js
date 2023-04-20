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

export const login = async (credentials) => {
  const response = await axiosClient.post('/login', credentials);
  return response.data;
}

export const logout = async () => {
  const response = await axiosClient.post('/logout');
  return response.data;
}

export const register = async (newAccountInfo) => {
  const response = await axiosClient.post('/register', newAccountInfo);
  return response.data;
}