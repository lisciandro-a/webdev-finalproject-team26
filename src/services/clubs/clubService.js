import axiosClient from "../axiosClient";

export const getClubsByMemberUsername = async (username) => {
  try {
    const result = await axiosClient.get(`/profile/${username}/clubs`);
    return result.data;
  } catch {
    return undefined;
  }
}