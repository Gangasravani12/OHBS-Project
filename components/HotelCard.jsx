// src/components/HotelCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HotelCard.css';

export default function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <img
        src={hotel.photos && hotel.photos.length > 0 ? hotel.photos[0] : '/fallback.jpg'}alt={hotel.name}
      />
      <div className="info">
        <h3>
          <Link to={`/hotels/${hotel.id}`}>
            {hotel.name}
          </Link>
        </h3>
        <p>{hotel.location}</p>
        <p className="card-overview">{hotel.overview}</p>
        <div className="amenities-list">
       {hotel.amenities.slice(0, 3).map((a,i) => (
         <span key={i} className="amenity-tag">{a}</span>
       ))}
      </div>
        <p>{'★'.repeat(hotel.stars)}</p>
        <p className="price">${hotel.pricePerNight} Price </p>
        <Link to={`/hotels/${hotel.id}`}>
          <button className="btn">View Details</button>
        </Link>

      </div>
    </div>
  );
}
