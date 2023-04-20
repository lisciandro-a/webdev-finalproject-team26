import axios from "axios";

const SIMKL_CLIENT_ID = process.env.REACT_APP_SIMKL_CLIENT_ID;
const SIMKL_BASE_URL = "https://api.simkl.com"

export const searchSimklById = async (mediaType, simklID) => {
    const fullUrl = `${SIMKL_BASE_URL}/${mediaType === 'movie' ? 'movies' : mediaType}/${simklID}?client_id=${SIMKL_CLIENT_ID}&extended=full`;

    const result = await axios.get(fullUrl);
    return result.data;
}