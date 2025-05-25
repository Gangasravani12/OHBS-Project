// src/components/HotelList.jsx
import React from 'react';
import HotelCard from './HotelCard';

export default function HotelList({ hotels }) {
  return (
    <div>
      {hotels.map(h => <HotelCard key={h.id} hotel={h} />)}
    </div>
  );
}
