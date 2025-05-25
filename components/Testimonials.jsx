// src/components/Testimonials.jsx
import React from 'react';
import './Testimonials.css';

const reviews = [
  { id:1, quote:'Amazing stay and friendly staff!', author:'– Sarah L.' },
  { id:2, quote:'Best hotel experience ever.', author:'– Mark T.' },
  { id:3, quote:'Luxurious and comfortable rooms.', author:'– Emily R.' },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What Our Guests Say</h2>
      <div className="testi-grid">
        {reviews.map(r=>(
          <div key={r.id} className="testi-card">
            <p className="quote">“{r.quote}”</p>
            <p className="author">{r.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
