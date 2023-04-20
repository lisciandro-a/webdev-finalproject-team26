import axios from "axios";

const SIMKL_CLIENT_ID = process.env.REACT_APP_SIMKL_CLIENT_ID;
const SIMKL_BASE_URL = "https://api.simkl.com"

export const searchSimklById = async (idType = 'simkl', id) => {
    const fullUrl = `${SIMKL_BASE_URL}/search/id?${idType}=${id}&client_id=${SIMKL_CLIENT_ID}`;

    const result = await axios.get(fullUrl);
    return result.data[0];
};