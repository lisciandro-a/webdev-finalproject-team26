import axiosClient from "../axiosClient";

export const getClubsByMemberUsername = async (username) => {
  try {
    const result = await axiosClient.get(`/profile/${username}/clubs`);
    return result.data;
  } catch {
    return undefined;
  }
}

export const getNewMembersForClub = async (clubUsername) => {
  try {
    const result = await axiosClient.get(`/clubs/${clubUsername}/newMembers`);
    return result.data;
  } catch {
    return [];
  }
}

export const getPopularClubs = async () => {
  try {
    const result = await axiosClient.get('/clubs/popular');
    return result.data;
  } catch {
    return [];
  }
}

export const getNewComments = async (clubUsername) => {
  try {
    const result = await axiosClient.get(`/clubs/${clubUsername}/recentComments`);
    return result.data;
  } catch {
    return [];
  }
}

export const getNewAnnouncements = async (username) => {
  try {
    const result = await axiosClient.get(`/profile/${username}/clubs/announcements`);
    return result.data;
  } catch {
    return [];
  }
}

export const getClubDiscussion = async (clubUsername, mediaType, mediaId) => {
  try {
    const result = await axiosClient.get(`/clubs/${clubUsername}/discussion/${mediaType}/${mediaId}`);
    return result.data;
  } catch {
    return {};
  }
}

export const createCommentForClubDiscussion = async (clubUsername, mediaType, mediaId, newComment) => {
  const result = await axiosClient.post(`/clubs/${clubUsername}/discussion/${mediaType}/${mediaId}`, newComment);
  return result.data;
}
