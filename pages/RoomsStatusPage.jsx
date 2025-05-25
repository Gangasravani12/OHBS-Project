// src/pages/RoomsStatusPage.jsx
import React, { useState, useEffect } from 'react';
import roomsData from '../data/rooms.json';
import roomService from '../api/roomService';         // ← NEW: service with static fallback
import '../components/HotelCard.css';    // card-like styling (if still used)
import '../components/SortBar.css';      // select styling
import './RoomsStatusPage.css';

export default function RoomsStatusPage({ hotelId }) {
  const [filter, setFilter] = useState('All');
  const [rooms, setRooms]   = useState([]);

  useEffect(() => {
    const load = async () => {
      let data;
      try {
        data = await roomService.getByHotel(hotelId);
      } catch {
        data = roomsData;
      }
      setRooms(data);
    };
    load();
  }, [hotelId]);

  const filteredRooms =
    filter === 'All'
      ? rooms
      : rooms.filter(r => r.status === filter);

  return (
    <div className="rooms-status-page">
      <div className="status-controls">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          className="sort-select"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Maintenance">Under Maintenance</option>
        </select>
      </div>

      <table className="rooms-table">
        <thead>
          <tr>
            <th>Room #</th>
            <th>Type</th>
            <th>Price/Night</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map(room => {
            // Determine correct badge class
            const statusClass =
              room.status === 'Available'
                ? 'status-badge available'
                : room.status === 'Occupied'
                ? 'status-badge occupied'
                : 'status-badge maintenance';

            return (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.type}</td>
                <td>${room.pricePerNight}</td>
                <td>
                  <span className={statusClass}>
                    {room.status === 'Maintenance' ? 'Under Maintenance' : room.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
