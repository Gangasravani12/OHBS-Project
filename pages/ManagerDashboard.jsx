// src/pages/ManagerDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerDashboard.css';
import Button from '../components/Button';

export default function ManagerDashboard() {
  const nav = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Welcome, Hotel Manager</h2>
      <div className="dashboard-actions">
        <Button onClick={() => nav('/manager/rooms-status')}>
          View Room Status
        </Button>
        <Button onClick={() => nav('/manager/hotel-details')}>
          Add / Update Hotel Details
        </Button>
      </div>
    </div>
  );
}
