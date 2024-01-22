//const API_BASE_URL = import.meta.env.WEB_PORTAL_API || 'http://localhost:8000/api/v1/auth';
const API_BASE_URL =  'http://localhost:8000/api/v1/auth';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login`,
    LINK_LOGIN: `${API_BASE_URL}/link-login`,
    LOGOUT: `${API_BASE_URL}/logout`,
    REFRESH: `${API_BASE_URL}/refresh`,
    PROFILE: `${API_BASE_URL}/profile`,
};
