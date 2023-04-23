import axios from "axios";

const SIMKL_CLIENT_ID = process.env.REACT_APP_SIMKL_CLIENT_ID;
const SIMKL_BASE_URL = "https://api.simkl.com"

export const fullSearch = async (mediaType, query) => {
    const fullUrl = `${SIMKL_BASE_URL}/search/${mediaType}?q=${query}&client_id=${SIMKL_CLIENT_ID}&extended=full`;
    try {
        const result = await axios.get(fullUrl);
        return result.data;
    } catch {
        return undefined;
    }
};