// src/config/apiConfig.js

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login`,
    LOGOUT: `${API_BASE_URL}/logout`,
    REGISTER: `${API_BASE_URL}/register`,
    // add more endpoints as needed
};
