// src/api/authService.js
import axios from './axios';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

const saveUserToStorage = (user, token) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => localStorage.getItem(TOKEN_KEY);

// ✅ Register
const register = async (data) => {
  const response = await axios.post('/auth/register', data);
  saveUserToStorage(response.data.user, response.data.token);
  return response.data.user;
};

// ✅ Login
const login = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  saveUserToStorage(response.data.user, response.data.token);
  return response.data.user;
};

// ✅ Get Current User
const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// ✅ Logout
const logout = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export default {
  register,
  login,
  getCurrentUser,
  logout,
  getToken
};
