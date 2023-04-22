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