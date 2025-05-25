// src/data/adminData.js
export const users = [
  { id: 'u1', name: 'Alice Smith', role: 'Customer' },
  { id: 'u2', name: 'Bob Jones', role: 'Hotel Manager' },
  { id: 'u3', name: 'Carol Lee', role: 'Admin' },
];

export const hotels = [
  { id: 'h1', name: 'The Plaza', status: 'Approved' },
  { id: 'h2', name: 'City Inn', status: 'Pending' },
  { id: 'h3', name: 'Oceanview', status: 'Pending' },
];

export const bookings = [
  { id: 'b1', user: 'Alice Smith', hotel: 'The Plaza', date: '2025-06-01' },
  { id: 'b2', user: 'Bob Jones', hotel: 'Oceanview', date: '2025-07-10' },
  { id: 'b3', user: 'Carol Lee', hotel: 'City Inn', date: '2025-08-15' },
];
