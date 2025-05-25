// src/pages/ProfileUpdatePage.jsx
import React, { useState, useEffect } from 'react';
import userService from '../api/userService';
import { useToast } from '../components/ToastProvider';
import './ProfileUpdatePage.css';

export default function ProfileUpdatePage() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    locationInCity: '',
    state: '',
    country: '',
    pincode: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userService.getProfile();
        setFormData({
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          gender: data.gender || '',
          locationInCity: data.address?.locationInCity || '',
          state: data.address?.state || '',
          country: data.address?.country || '',
          pincode: data.address?.pincode || ''
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        fullName, email, phone, gender,
        locationInCity, state, country, pincode
      } = formData;

      const payload = {
        fullName,
        email,
        phone,
        gender,
        address: {
          locationInCity,
          state,
          country,
          pincode
        }
      };

      await userService.updateProfile(payload);
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-update-page">
      <h2>Update Profile</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Full Name
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone Number
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Gender
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Location in City
          <input type="text" name="locationInCity" value={formData.locationInCity} onChange={handleChange} />
        </label>
        <label>
          State
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
        </label>
        <label>
          Country
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </label>
        <label>
          Pincode
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
