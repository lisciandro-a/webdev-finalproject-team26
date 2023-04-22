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

export const getNewAnnouncements = async (username) => {
  try {
    const result = await axiosClient.get(`/profile/${username}/clubs/announcements`);
    return result.data;
  } catch {
    return [];
  }
}

export const addNewDiscussion = async (username, mediaType, mediaId) => {
  try {
    const result = await axiosClient.post(`/clubs/${username}/discussions/${mediaType}/${mediaId}`);
    return result.data;
  } catch {
    return [];
  }
}

export const deleteDiscussion = async (username, mediaType, mediaId) => {
  try {
    const result = await axiosClient.delete(`/clubs/${username}/discussions/${mediaType}/${mediaId}`);
    return result.data;
  } catch {
    return [];
  }
}

export const updateDiscussion = async (updateDiscussionInfo) => {
  try {
    const result = await axiosClient.put('/clubs/discussions', updateDiscussionInfo);
    return result.data;
  } catch {
    return undefined;
  }
}

export const getClubDiscussionByMediaId = async (username, mediaType, mediaId) => {
  try {
    const result = await axiosClient.get(`/clubs/${username}/discussion/${mediaType}/${mediaId}`);
    return result.data;
  } catch {
    return undefined;
  }
}

export const getClubMembers = async (username) => {
  try {
    const result = await axiosClient.get(`/clubs/${username}/members`);
    return result.data;
  } catch {
    return [];
  }
}

export const getClubAnnouncements = async (username) => {
  try {
    const result = await axiosClient.get(`/clubs/${username}/announcements`);
    return result.data;
  } catch {
    return [];
  }
}

export const createClubAnnouncement = async (newAnnouncement) => {
  try {
    const result = await axiosClient.post('/clubs/announcement', newAnnouncement);
    return result;
  } catch {
    return undefined;
  }
}

export const deleteClubAnnouncement = async (announcementId) => {
  try {
    const result = await axiosClient.delete(`/clubs/announcement/${announcementId}`);
    return result;
  } catch {
    return undefined;
  }
}