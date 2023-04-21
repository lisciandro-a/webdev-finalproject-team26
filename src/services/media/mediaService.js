import axiosClient from "../axiosClient";

export const getLikedByUsername = async (username) => {
  const response = await axiosClient.get(`/profile/${username}/likes`);
  return response.data;
}

export const getWatchedByUsername = async (username) => {
  const response = await axiosClient.get(`/profile/${username}/watches`);
  return response.data;
}

export const getMediaByUsername = async (username) => {
  const response = await axiosClient.get(`/profile/${username}/media`);
  return response.data;
}

export const getMediaByUsernameMediaId = async (mediaType, mediaId, username) => {
  const response = await axiosClient.get(`/profile/${username}/media/${mediaType}/${mediaId}`);
  return response.data;
}

export const getMediaByMediaId = async (mediaType, mediaId) => {
  const response = await axiosClient.get(`/media/${mediaType}/${mediaId}`);
  return response.data;
}

export const addWatchedValueByUsernameByMediaId = async (mediaType, mediaId, username) => {
  const response = await axiosClient.post(`/profile/${username}/watches/${mediaType}/${mediaId}`);
  return response.data;
}

export const deleteWatchedValueByUsernameByMediaId = async (mediaType, mediaId, username) => {
  const response = await axiosClient.delete(`/profile/${username}/watches/${mediaType}/${mediaId}`);
  return response.data;
}

export const addLikedValueByUsernameByMediaId = async (mediaType, mediaId, username) => {
  const response = await axiosClient.post(`/profile/${username}/likes/${mediaType}/${mediaId}`);
  return response.data;
}

export const deleteLikedValueByUsernameByMediaId = async (mediaType, mediaId, username) => {
  const response = await axiosClient.delete(`/profile/${username}/likes/${mediaType}/${mediaId}`);
  return response.data;
}

export const addMedia = async (media) => {
  const response = await axiosClient.post(`/media`, media);
  return response.data;
}