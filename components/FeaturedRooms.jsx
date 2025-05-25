// src/components/FeaturedRooms.jsx
import React from 'react';
import './FeaturedRooms.css';

const rooms = [
  { id:1, title:'Ocean View Suite', img:'https://img.freepik.com/free-photo/luxury-beach-house-with-glass-windows-beautiful-scenery-sea_181624-9041.jpg?semt=ais_hybrid&w=740', desc:'Stunning sea views.' },
  { id:2, title:'City Lights Room', img:'https://img.freepik.com/free-photo/cozy-home-interior-anime-style_23-2151176369.jpg?ga=GA1.1.1716789071.1747287367&semt=ais_hybrid&w=740', desc:'In the heart of downtown.' },
  { id:3, title:'Garden Villa', img:'https://img.freepik.com/free-photo/contemporary-house-architecture_23-2151050996.jpg?ga=GA1.1.1716789071.1747287367&semt=ais_hybrid&w=740', desc:'Private garden access.' },
];

export default function FeaturedRooms() {
  return (
    <section className="featured-rooms">
      <h2>Featured Rooms & Deals</h2>
      <div className="rooms-grid">
        {rooms.map(r=>(
          <div key={r.id} className="room-card">
            <img src={r.img} alt={r.title} />
            <div className="room-info">
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <button>View Offer</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
