// src/components/CategoryGrid.jsx
import React from 'react';
import './CategoryGrid.css';

const categories = [
  { id: 'family', title: 'Best for Families', image: 'https://img.freepik.com/free-photo/young-parents-lying-bed-lifting-daughter_23-2147894881.jpg?ga=GA1.1.1716789071.1747287367&w=740', filter: { amenities: ['Kids Club'] } },
  { id: 'romantic', title: 'Romantic Getaways', image: 'https://img.freepik.com/free-photo/romantic-sunset-picnic_23-2151937802.jpg?ga=GA1.1.1716789071.1747287367&semt=ais_hybrid&w=740', filter: { stars: [4,5] } },
  { id: 'business', title: 'Business Travel', image: 'https://img.freepik.com/free-photo/happy-businesswoman-sitting-bed-hotel-room-talking-mobile-phone_637285-7636.jpg?ga=GA1.1.1716789071.1747287367&w=740', filter: { amenities: ['Business Center'] } },
  { id: 'budget', title: 'Budget-Friendly', image: 'https://img.freepik.com/free-photo/couple-traveling-with-vaccination-passports_23-2149351576.jpg?ga=GA1.1.1716789071.1747287367&semt=ais_hybrid&w=740', filter: { pricePerNight: 100 } },
];

export default function CategoryGrid({ onSelectCategory }) {
  return (
    <section className="category-grid section">
      <h2>Browse by Category</h2>
      <div className="cards-grid">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="card"
            onClick={() => onSelectCategory(cat.filter)}
          >
            <img src={cat.image} alt={cat.title} />
            <div className="card-content">
              <h3>{cat.title}</h3>
              <button>View All</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
