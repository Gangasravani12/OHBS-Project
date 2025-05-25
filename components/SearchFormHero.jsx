// src/components/SearchFormHero.jsx
import React, { useState } from 'react';
import './SearchFormHero.css';

export default function SearchFormHero({ onSearch }) {
  const [location, setLocation]   = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]     = useState('');
  const [guests, setGuests]       = useState(1);

  const handleSubmit = e => {
    e.preventDefault();
    onSearch({ location: location.trim(), startDate, endDate, guests });
  };

  const onDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const onGuestChange = value => {
    setGuests(value);
  };

  return (
    <form className="search-form-hero" onSubmit={handleSubmit}>
      {/* Location */}
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          placeholder="City or Hotel"
          value={location}
          onChange={e => setLocation(e.target.value)}
          aria-required="true"
        />
      </div>

      {/* Check-in */}
      <div className="form-group">
        <label htmlFor="checkin">Check-in</label>
        <input
          id="checkin"
          type="date"
          value={startDate}
          onChange={e => onDateChange(e.target.value, endDate)}
          required
          aria-required="true"
        />
      </div>

      {/* Check-out */}
      <div className="form-group">
        <label htmlFor="checkout">Check-out</label>
        <input
          id="checkout"
          type="date"
          value={endDate}
          onChange={e => onDateChange(startDate, e.target.value)}
          required
          aria-required="true"
          min={startDate}
        />
      </div>

      {/* Guests */}
      <div className="form-group">
        <label htmlFor="guests">Guests</label>
        <select
          id="guests"
          value={guests}
          onChange={e => onGuestChange(+e.target.value)}
          required
          aria-required="true"
        >
          {[1,2,3,4].map(n => (
            <option key={n} value={n}>
              {n} guest{n>1?'s':''}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button type="submit" className="btn-search" aria-label="Search rooms">
        Search
      </button>
    </form>
  );
}
