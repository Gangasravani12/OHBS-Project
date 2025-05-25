// src/api/bookingService.js
import api from './axios';

export default {
  /**
   * Create a new booking on the backend.
   * @param {{ hotelId, startDate, endDate, guests }} data
   * @returns {Promise<object>} the created booking
   */
  create: async ({ hotelId, startDate, endDate, guests }) => {
    const res = await api.post('/bookings', {
      hotelId,
      startDate,
      endDate,
      guests
    });
    return res.data;
  },
  getUserBookings: async () => {
    const res = await api.get('/bookings/mine'); // or '/user/bookings' based on your backend
    return res.data;
  },

  cancel: async (id) => {
    await api.delete(`/bookings/${id}`);
  },

  create: async (bookingData) => {
    const res = await api.post('/bookings', bookingData);
    return res.data;
  }
};
