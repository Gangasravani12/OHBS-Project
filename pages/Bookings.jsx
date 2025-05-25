// src/pages/Bookings.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import bookingService from '../api/bookingService';
import { useToast } from '../components/ToastProvider';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css'; // reuse styles

Modal.setAppElement('#root');

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { user } = useAuth();

  // 🔁 Fetch bookings on mount
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        setLoading(true);
        const data = await bookingService.getUserBookings();
        setBookings(data);
      } catch (e) {
        console.error('Failed to load bookings:', e);
        toast.error('Could not load your bookings.');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const openModal = booking => {
    setSelectedBooking(booking);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBooking(null);
  };

  const confirmCancel = async () => {
    try {
      await bookingService.cancel(selectedBooking.id);
      setBookings(prev => prev.filter(b => b.id !== selectedBooking.id));
      toast.success('Booking canceled successfully.');
    } catch (e) {
      console.error(e);
      toast.error('Failed to cancel booking.');
    } finally {
      closeModal();
    }
  };

  return (
    <div className="profile-page">
      <h2>Your Bookings</h2>

      {loading && <p>Loading bookings…</p>}
      {!loading && bookings.length === 0 && (
        <p>You have no active bookings.</p>
      )}

      <ul className="booking-list">
        {bookings.map(b => (
          <li key={b.id} className="booking-item">
            <div>
              <strong>{b.hotelName || b.hotel}</strong>{' '}
              <em>
                {new Date(b.startDate).toLocaleDateString()} –{' '}
                {new Date(b.endDate).toLocaleDateString()}
              </em>
              <div>Guests: {b.guests}</div>
              <div>Total: ${b.total}</div>
            </div>
            <button className="btn-cancel" onClick={() => openModal(b)}>
              Cancel Booking
            </button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Cancellation"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3>Confirm Cancellation</h3>
        <p>Are you sure you want to cancel this booking?</p>
        <div className="modal-buttons">
          <button onClick={confirmCancel}>Yes, Cancel</button>
          <button onClick={closeModal}>No, Keep</button>
        </div>
      </Modal>
    </div>
  );
}
