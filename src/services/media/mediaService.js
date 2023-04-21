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

export const getMediaByMediaId = async (mediaType, mediaId) => {
  const response = await axiosClient.get(`/media/${mediaType}/${mediaId}`);
  return response.data;
}