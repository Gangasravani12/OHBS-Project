// src/api/adminService.js
import api from './axios';
import { users, hotels, bookings } from '../data/adminData.js';

export default {
  async getMetrics() {
    try {
      const res = await api.get('/admin/metrics');
      return { ...res.data, usingDummy: false };
    } catch {
      return {
        totalUsers:    users.length,
        totalHotels:   hotels.length,
        totalBookings: bookings.length,
        usingDummy:    true    // flag fallback
      };
    }
  },

  async getPendingHotels() {
    try {
      const res = await api.get('/admin/hotels/pending');
      return { data: res.data, usingDummy: false };
    } catch {
      return {
        data:     hotels.filter(h => h.status === 'Pending'),
        usingDummy: true
      };
    }
  },

  async getRecentBookings() {
    try {
      const res = await api.get('/admin/bookings/recent');
      return { data: res.data, usingDummy: false };
    } catch {
      return {
        data:       bookings,
        usingDummy: true
      };
    }
  },

  async approveHotel(id) {
    try {
      await api.post(`/admin/hotels/${id}/approve`);
    } catch {
      console.warn('[adminService.approveHotel] dummy fallback');
    }
  },

  async rejectHotel(id) {
    try {
      await api.post(`/admin/hotels/${id}/reject`);
    } catch {
      console.warn('[adminService.rejectHotel] dummy fallback');
    }
  }
};
