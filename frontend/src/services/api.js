// dynamic-ranking-frontend/src/services/api.js
import axios from 'axios';

// --- CHANGE THIS LINE ---
// Use process.env.REACT_APP_API_URL when deployed, fallback to localhost for local development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API = axios.create({
    baseURL: API_BASE_URL, // Now it uses the dynamic URL
});

export const getUsers = () => API.get('/api/users'); // Ensure /api is here if your backend routes are prefixed
export const addUser = (username) => API.post('/api/users', { username });
export const claimPoints = (userId) => API.post(`/api/claim-points/${userId}`);
export const initializeUsers = () => API.post('/api/initialize-users');