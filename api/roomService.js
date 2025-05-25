// src/api/roomService.js
import api from './axios';
import roomsData from '../data/rooms.json';

export default {
  getByHotel: async (hotelId) => {
    try {
      // Try your future backend endpoint
      const res = await api.get('/rooms', { params: { hotelId } });
      return res.data;
    } catch (e) {
      console.warn('[roomService.getByHotel] API unavailable, using static rooms.json', e);
      // Fallback to static data
      return roomsData.filter(r => r.hotelId === hotelId);
    }
  },

  // you can stub update similarly, once you have the endpoint:
  update: async (roomId, payload) => {
    try {
      const res = await api.put(`/rooms/${roomId}`, payload);
      return res.data;
    } catch (e) {
      console.warn('[roomService.update] API unavailable', e);
      // no local fallback for updates
      throw e;
    }
  }
};
