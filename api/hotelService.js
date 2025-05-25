// src/api/hotelService.js
import api from './axios';
import { hotels as staticHotels } from '../data/hotels.js';

export default {
  getAll: async (filters = {}, sortBy = 'price') => {
    const params = {
      price:      filters.price,
      stars:      filters.stars.join(','),
      amenities:  filters.amenities.join(','),
      sort:       sortBy,
      location:   filters.location,
      startDate:  filters.startDate,
      endDate:    filters.endDate,
      guests:     filters.guests,
    };
    const res = await api.get('/hotels', { params });
    return res.data; // assume array of hotels
  },

  // ← NEW: fetch a single hotel by ID
  getById: async id => {
    try {
      const res = await api.get(`/hotels/${id}`);
      return res.data;
    } catch (e) {
      console.warn('[hotelService.getById] falling back to static', e);
      return staticHotels.find(h => h.id === id) || null;
    }
  },

  // ← NEW: search endpoint
  search: async ({ location, startDate, endDate, guests }) => {
    try {
      const res = await api.get('/hotels/search', {
        params: { location, startDate, endDate, guests }
      });
      return res.data;
    } catch (e) {
      console.warn('[hotelService.search] falling back to static', e);
      const q = location.trim().toLowerCase();
      return staticHotels.filter(h =>
        h.location.toLowerCase().includes(q) ||
        h.name.toLowerCase().includes(q)
      );
    }
  }
};
