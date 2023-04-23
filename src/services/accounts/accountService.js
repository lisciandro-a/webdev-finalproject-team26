import axiosClient from "../axiosClient";

export const login = async (credentials) => {
  try {
    const response = await axiosClient.post('/login', credentials);
    return response.data;
  } catch(e) {
    throw(e);
  }
}

export const logout = async () => {
  try {  
    const response = await axiosClient.post('/logout');
    return response.data;
  } catch {
    return undefined;
  }
}

export const register = async (newAccountInfo) => {
  try {
    const response = await axiosClient.post('/register', newAccountInfo);
    return response.data;
  } catch {
    return undefined;
  }
}

export const updateProfile = async (updatedAccountInfo, username) => {
  try {
    const response = await axiosClient.put(`/profile/${username}`, updatedAccountInfo);
    return response.data;
  } catch {
    return undefined;
  }
}

export const getProfileByUsername = async (username) => {
  try {
    const response = await axiosClient.get(`/profile/${username}`);
    return response.data;
  } catch {
    return undefined;
  }
}