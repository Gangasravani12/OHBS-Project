// src/components/Promotions.jsx
import React from 'react';
import './Promotions.css';

const promos = [
  { id: 'summer', title: 'Summer Beach Escapes', subtitle: 'Up to 30% off', image: 'https://img.freepik.com/free-photo/couple-dancing-by-pool-vacation_23-2149369707.jpg?ga=GA1.1.1716789071.1747287367&semt=ais_hybrid&w=740', link: '/hotels?promo=summer' },
  { id: 'early', title: 'Early-Bird Deals', subtitle: 'Book 2 months ahead', image: 'https://cdn.kohapikjunresort.com/wp-content/uploads/2024/06/Early-bird-Offer_-Apikjun-Resort.jpg?strip=all&lossy=1&quality=90&w=1024&ssl=1', link: '/hotels?promo=early' },
  { id: 'last', title: 'Last-Minute Offers', subtitle: 'Save on same-week trips', image: 'https://videos.openai.com/vg-assets/assets%2Ftask_01jvdgf0ynf2zrpq08j5c8hf7n%2F1747431475_img_3.webp?st=2025-05-16T20%3A34%3A40Z&se=2025-05-22T21%3A34%3A40Z&sks=b&skt=2025-05-16T20%3A34%3A40Z&ske=2025-05-22T21%3A34%3A40Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=r1mHWWyas71%2Bvxt2kTQfdagf%2B5EXJCANGBS0nybGbiA%3D&az=oaivgprodscus', link: '/hotels?promo=last' },
];

export default function Promotions() {
  return (
    <section className="promotions section">
      <h2>Special Promotions</h2>
      <div className="cards-grid">
        {promos.map(p => (
          <a key={p.id} href={p.link} className="card">
            <img src={p.image} alt={p.title} />
            <div className="card-content">
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
// // This code defines a Promotions component that displays a list of special promotions for a hotel booking application. Each promotion includes a title, subtitle, image, and a link to view more details. The component uses CSS for styling and ensures a clean and user-friendly interface. The promotions are displayed in a grid layout, making it easy for users to browse through the available offers. This component can be integrated into the main page of the application to attract users with special deals and discounts.