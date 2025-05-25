// src/components/Amenities.jsx
import React from 'react';
import './Amenities.css';

const items = [
  { icon:'🛎️', label:'Best Offers' },
  { icon:'🏊‍♂️', label:'Pool & Spa' },
  { icon:'🍽️', label:'Gourmet Dining' },
  { icon:'🏋️‍♂️', label:'All kind of stays' },
];

export default function Amenities() {
  return (
    <section className="amenities">
      <h2>Our Amenities</h2>
      <div className="amenities-grid">
        {items.map((a,i)=>(
          <div key={i} className="amenity">
            <span className="icon">{a.icon}</span>
            <p>{a.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
