// src/components/FilterSidebar.jsx
import React from 'react';
import './FilterSidebar.css';

export default function FilterSidebar({ filters, onChange }) {
  const onCheckbox = (group, value) => {
    const set = new Set(filters[group]);
    set.has(value) ? set.delete(value) : set.add(value);
    onChange({ ...filters, [group]: [...set] });
  };

  return (
    <aside className="filter-sidebar">
      <section>
        <h4>Price</h4>
        <input
          type="range" min="0" max="2000" 
          value={filters.price} 
          onChange={e => onChange({ ...filters, price: e.target.value })}
        />
        <span>${filters.price}+</span>
      </section>
      <section>
        <h4>Stars</h4>
        {[5,4,3,2].map(n => (
          <label key={n}>
            <input
              type="checkbox"
              checked={filters.stars.includes(n)}
              onChange={() => onCheckbox('stars', n)}
            />
            {n}★
          </label>
        ))}
      </section>
      <section>
        <h4>Amenities</h4>
        {['Free WiFi','Pool','Breakfast'].map(a=>(
          <label key={a}>
            <input
              type="checkbox"
              checked={filters.amenities.includes(a)}
              onChange={()=>onCheckbox('amenities', a)}
            />
            {a}
          </label>
        ))}
      </section>
    </aside>
);
}
