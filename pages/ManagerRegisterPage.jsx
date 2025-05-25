// src/pages/ManagerRegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import './ManagerAuth.css';

export default function ManagerRegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [position, setPosition] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    // Trim inputs
    const ep = email.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate required fields
    if (!name || !hotelName || !position || !address || !ep || !password || !confirm) {
      return setError('Please fill in all fields.');
    }
    if (!pattern.test(ep)) {
      return setError('Please enter a valid email.');
    }
    if (password !== confirm) {
      return setError('Passwords do not match.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    const managerData = { email: ep, password };
   localStorage.setItem('managerData', JSON.stringify(managerData));
   alert('Manager registered! You can now log in.');
   navigate('/manager/login');
  };

  return (
    <div className="manager-form-container">
      <h2>Hotel Manager Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <FormInput
          label="Hotel Name"
          type="text"
          name="hotelName"
          value={hotelName}
          onChange={e => setHotelName(e.target.value)}
        />
        <FormInput
          label="Your Position"
          type="text"
          name="position"
          value={position}
          onChange={e => setPosition(e.target.value)}
        />
        <FormInput
          label="Hotel Address"
          type="text"
          name="address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirm"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
