import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials, axiosConfig);
  return response.data;
}

export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`, {}, axiosConfig);
  return response.data;
}

export const register = async (newAccountInfo) => {
  const response = await axios.post(`${API_URL}/register`, newAccountInfo, axiosConfig);
  return response.data;
}