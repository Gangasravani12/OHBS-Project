import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import './ManagerAuth.css';

export default function ManagerLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dummyManager = { email: 'manager@hotel.com', password: 'manager123' };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    const ep = email.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!ep || !password) return setError('Fill all fields');
    if (!pattern.test(ep)) return setError('Invalid email');
    // Retrieve stored credentials
   const stored = localStorage.getItem('managerData');
   if (!stored) {
     return setError('No registered manager found. Please register first.');
   }
   const { email: savedEmail, password: savedPassword } = JSON.parse(stored);

   if (ep === savedEmail && password === savedPassword) {
     navigate('/manager/dashboard');
   } else {
     setError('Invalid credentials');
   }
  };

  return (
    <div className="manager-form-container">
      <h2>Hotel Manager Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
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
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
