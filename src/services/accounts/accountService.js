import axiosClient from "../axiosClient";

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

export const getProfileByUsername = async (username) => {
  const response = await axiosClient.get(`/profile/${username}`);
  return response.data;
}