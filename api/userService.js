// src/api/userService.js
import api from './axios';

export default {
  getProfile: async () => {
    const res = await api.get('/users/me');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await api.put('/users/me', data);
    return res.data;
  }
};
