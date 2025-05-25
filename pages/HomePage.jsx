// import React from 'react';
// import './HomePage.css';

// const HomePage = () => {
//   // Sample hotel data
//   const hotels = [
//     {
//       name: 'Sunset Resort',
//       location: 'Miami, FL',
//       price: 200,
//       imageUrl: 'https://via.placeholder.com/300x200?text=Sunset+Resort'
//     },
//     {
//       name: 'Mountain Lodge',
//       location: 'Aspen, CO',
//       price: 150,
//       imageUrl: 'https://via.placeholder.com/300x200?text=Mountain+Lodge'
//     },
//     {
//       name: 'City Center Inn',
//       location: 'New York, NY',
//       price: 250,
//       imageUrl: 'https://via.placeholder.com/300x200?text=City+Center+Inn'
//     }
//   ];

//   return (
//     <div>
//       <section className="hero">
//         <h1>Find Your Perfect Stay</h1>
//         <p>Book your dream hotel with ease and comfort.</p>
//       </section>
//       <section className="hotels">
//         <h2>Featured Hotels</h2>
//         <div className="hotels-container">
//           {hotels.map((hotel, index) => (
//             <div key={index} className="hotel-card">
//               <img src={hotel.imageUrl} alt={hotel.name} />
//               <h3>{hotel.name}</h3>
//               <p>{hotel.location}</p>
//               <p>${hotel.price} / night</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;
// // // This code defines a HomePage component that serves as the landing page for a hotel booking application. It includes a hero section with a title and description, and a featured hotels section that displays a list of hotels with their names, locations, prices, and images. The hotel data is hardcoded for demonstration purposes, but in a real application, this data would typically be fetched from an API. The component uses basic CSS for styling, ensuring a clean and user-friendly interface. The HomePage component can be used as the main entry point for users to explore and book hotels within the application.

// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import FeaturedRooms from '../components/FeaturedRooms';
import Amenities from '../components/Amenities';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import CategoryGrid from '../components/CategoryGrid';
import Promotions from '../components/Promotions';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearch = ({ location, startDate, endDate, guests }) => {
    // navigate to HotelsPage, passing filters as URL query params
    const params = new URLSearchParams({
      location,
      startDate: startDate || '',
      endDate:   endDate   || '',
      guests:    String(guests),
    }).toString();
    navigate(`/hotels?${params}`);
  };
  return (
    <> 
      
      <HeroBanner onSearch={handleSearch} />
      <FeaturedRooms />
      <Amenities />
      <CategoryGrid />
      <Promotions />
      <Testimonials />
      <Footer />
      </>
  );
}
