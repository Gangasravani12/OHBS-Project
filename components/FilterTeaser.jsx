// src/components/FilterTeaser.jsx
import React from 'react';
import './FilterTeaser.css';

export default function FilterTeaser({ filters, onChange }) {
  return (
    <section className="filter-teaser section">
      <h2>Find Your Stay</h2>
      <div className="teaser-controls">
        <div className="control">
          <label>Price up to ${filters.price}</label>
          <input
            type="range"
            min="50"
            max="1000"
            value={filters.price}
            onChange={e => onChange({ ...filters, price: +e.target.value })}
          />
        </div>
        <div className="control">
          <label>Stars</label>
          <select
            value={filters.stars[0] || ''}
            onChange={e => onChange({ ...filters, stars: e.target.value ? [+e.target.value] : [] })}
          >
            <option value="">Any</option>
            {[5,4,3,2].map(s => (
              <option key={s} value={s}>{s}★ & up</option>
            ))}
          </select>
        </div>
        <div className="control">
          <label>Top Amenity</label>
          <select
            value={filters.amenity || ''}
            onChange={e => onChange({ ...filters, amenity: e.target.value })}
          >
            <option value="">Any</option>
            {['Free WiFi','Pool','Breakfast'].map(a=>(
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <button onClick={() => onChange(filters)}>Show {filters.matchCount} hotels</button>
      </div>
    </section>
  );
}
// This code defines a FilterTeaser component that allows users to filter hotel listings based on price, star rating, and amenities. The component includes a range slider for price, a dropdown for star ratings, and another dropdown for amenities. When the user changes any of these filters, the onChange function is called with the updated filters. The component is styled using CSS to ensure a clean and user-friendly interface. This component can be integrated into a larger hotel booking application to enhance the user experience by allowing users to easily find hotels that meet their specific criteria.