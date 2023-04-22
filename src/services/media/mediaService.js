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
  try {
    const response = await axiosClient.get(`/profile/${username}/media/${mediaType}/${mediaId}`);
    return response.data;
  } catch {
    return undefined;
  }
}

export const getMediaByMediaId = async (mediaType, mediaId) => {
  try {
    const response = await axiosClient.get(`/media/${mediaType}/${mediaId}`);
    return response.data;
  } catch {
    return undefined;
  }
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

export const addReviewByUsernameByMediaId = async (mediaType, mediaId, username, review) => {
  const response = await axiosClient.post(`/profile/${username}/reviews/${mediaType}/${mediaId}`, review);
  return response.data;
}

export const getReviewsForMediaByMediaId = async (mediaType, mediaId) => {
  const response = await axiosClient.get(`/media/${mediaType}/${mediaId}/reviews`);
  return response.data;
}

export const getRecentReviews = async () => {
  try {
    const response = await axiosClient.get(`/media/reviews/recent`);
    return response.data;
  } catch {
    return [];
  }
}

export const getRecentReviewsOnLiked = async (username) => {
  try {
    const response = await axiosClient.get(`/profile/${username}/likes/recentlyReviewed`)
    return response.data;
  } catch {
    return [];
  }
}
