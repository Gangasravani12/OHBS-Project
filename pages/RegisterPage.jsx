import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/FormInput.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../context/AuthContext';

import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Static existing user to simulate "user already exists"
  const existingUserEmail = 'user@example.com';

  const { register } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!fullName || !email || !password || !confirmPassword) {
    setError('Please fill in all fields.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setError('Please enter a valid email address.');
    return;
  }

  if (password !== confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

  if (password.length < 6) {
    setError('Password must be at least 6 characters.');
    return;
  }

  try {
    await register({ name: fullName, email, password });
    alert('Registration successful!');
    navigate('/login');
  } catch (err) {
    setError(err?.response?.data?.message || 'Registration failed');
  }
};

    
  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <FormInput
          label="Full Name"
          type="text"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password"
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
        <Button type="submit">Register</Button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
// This code defines a RegisterPage component that allows users to register for an account. It includes form fields for full name, email, password, and password confirmation. The component performs basic validation checks, including checking for empty fields, validating the email format, ensuring passwords match, and checking for a minimum password length. If any validation fails, an error message is displayed. If registration is successful, an alert is shown and the user is redirected to the login page. The component uses FormInput and Button components for consistent styling and functionality.
