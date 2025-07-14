// dynamic-ranking-frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api' // Base URL for your backend API
});

export const getUsers = () => API.get('/users');
export const addUser = (username) => API.post('/users', { username });
export const claimPoints = (userId) => API.post(`/claim-points/${userId}`);
// Optional: If you implement initialize-users button in frontend
export const initializeUsers = () => API.post('/initialize-users');