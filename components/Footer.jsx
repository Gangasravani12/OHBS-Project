// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h4>About Us</h4>
          <p>Leading hospitality provider since 1999.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: info@hotelbooking.com</p>
          <p>Phone: +1-234-567-890</p>
        </div>
        <div>
          <h4>Follow Us</h4>
          <p>Facebook | Twitter | Instagram</p>
        </div>
        <div>
          <h4>Hotel Registration</h4>
          <Link to="/manager/register">H.Manager Register</Link><br/>
          <Link to="/manager/login">H.Manager Login</Link>
        </div>
      </div>
      <p className="footer-bottom">© 2025 HotelBooking. All rights reserved.</p>
    </footer>
  );
}
