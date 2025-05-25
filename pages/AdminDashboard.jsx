// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import adminService from '../api/adminService';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalHotels: 0,
    totalBookings: 0,
    usingDummy: false
  });
  const [pendingHotels, setPendingHotels] = useState([]);
  const [pendingDummy, setPendingDummy]   = useState(false);
  const [recentBookings, setRecentBookings] = useState([]);
  const [bookingsDummy, setBookingsDummy]   = useState(false);

  useEffect(() => {
    (async () => {
      // Metrics
      const m = await adminService.getMetrics();
      setMetrics(m);

      // Pending
      const ph = await adminService.getPendingHotels();
      setPendingHotels(ph.data);
      setPendingDummy(ph.usingDummy);

      // Recent
      const rb = await adminService.getRecentBookings();
      setRecentBookings(rb.data);
      setBookingsDummy(rb.usingDummy);
    })();
  }, []);

  const handleApprove = async id => {
    await adminService.approveHotel(id);
    setPendingHotels(prev => prev.filter(h => h.id !== id));
  };
  const handleReject = async id => {
    await adminService.rejectHotel(id);
    setPendingHotels(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      {/* Dummy Data Banner */}
      {(metrics.usingDummy || pendingDummy || bookingsDummy) && (
        <div className="dummy-banner">
          You are viewing <strong>dummy</strong> data (backend unreachable).
        </div>
      )}

      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="card metric-card">
          <h2>{metrics.totalUsers}</h2>
          <p>Total Users</p>
        </div>
        <div className="card metric-card">
          <h2>{metrics.totalHotels}</h2>
          <p>Total Hotels</p>
        </div>
        <div className="card metric-card">
          <h2>{metrics.totalBookings}</h2>
          <p>Total Bookings</p>
        </div>
      </div>

      {/* Pending Hotel Approvals */}
      <section className="section">
        <h2>Pending Hotel Approvals</h2>
        {pendingHotels.length > 0 ? (
          <table className="admin-table">
            {/* ... table header ... */}
            <tbody>
              {pendingHotels.map(h => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{h.name}</td>
                  <td className="badge pending">{h.status}</td>
                  <td>
                    <button
                      className="btn-approve"
                      onClick={() => handleApprove(h.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => handleReject(h.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hotels pending approval.</p>
        )}
      </section>

      {/* Recent Bookings */}
      <section className="section">
        <h2>Recent Bookings</h2>
        <table className="admin-table">
          {/* ... table header ... */}
          <tbody>
            {recentBookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user}</td>
                <td>{b.hotel}</td>
                <td>{b.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
