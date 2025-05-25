// src/components/HeroBanner.jsx
import React, { useState } from 'react';
import './HeroBanner.css';

export default function HeroBanner({ onSearch }) {
  // Search form state
  const [location, setLocation]   = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]     = useState('');
  const [guests, setGuests]       = useState(1);

  const handleSubmit = e => {
    e.preventDefault();
    onSearch({ location: location.trim(), startDate, endDate, guests });
  };

  return (
    <section className="hero-banner">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>
          Find Your <span className="hero-deco">Perfect Stay</span>
        </h1>
        <p>Book directly with the best rates and no hidden fees.</p>

        {/* UPDATED: hook up form submission */}
        <form className="hero-form" onSubmit={handleSubmit}>
          {/* Location */}
          <input
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />

          {/* Check-in date */}
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />

          {/* Check-out date */}
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            min={startDate}
            required
          />

          {/* Guests */}
          <select
            value={guests}
            onChange={e => setGuests(+e.target.value)}
            required
          >
            {[1, 2, 3, 4].map(n => (
              <option key={n} value={n}>
                {n} guest{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>

          {/* Search Button */}
          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  );
}
