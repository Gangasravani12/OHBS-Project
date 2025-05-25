// src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';
import paymentService from '../api/paymentService';
import './PaymentPage.css';

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast    = useToast();

  // booking details passed via navigate state
  const { booking, total } = state || {};
  const { hotelName, startDate, endDate, guests } = booking || {};

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry]         = useState('');
  const [cvv, setCvv]               = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [error, setError]           = useState('');
  const [processing, setProcessing] = useState(false);

  if (!booking) {
    return (
      <p className="error">
        No booking data.{' '}
        <button onClick={() => navigate('/')}>Go home</button>
      </p>
    );
  }

  const handlePayment = async e => {
    e.preventDefault();
    setError('');
    // validations
    if (!/^\d{16}$/.test(cardNumber)) {
      return setError('Enter a valid 16-digit card number');
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      return setError('Expiry must be in MM/YY');
    }
    if (!/^\d{3}$/.test(cvv)) {
      return setError('Enter a valid 3-digit CVV');
    }
    if (!nameOnCard.trim()) {
      return setError('Name on card is required');
    }

    setProcessing(true);
    try {
      // call the payment service
      await paymentService.process({
        bookingId:    booking.id,
        amount:       total,
        cardNumber,
        expiry,
        cvv,
        nameOnCard
      });

      toast.success('Payment successful! Your booking is confirmed.');
      navigate('/profile');
    } catch (err) {
      console.error('Payment error', err);
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="payment-page">
      <h2>Complete Your Payment</h2>
      <div className="booking-summary">
        <h3>{hotelName}</h3>
        <p>
          {new Date(startDate).toLocaleDateString()} →{' '}
          {new Date(endDate).toLocaleDateString()} · {guests}{' '}
          guest{guests > 1 ? 's' : ''}
        </p>
        <p className="total">Total: ${total}</p>
      </div>

      {error && <p className="error">{error}</p>}

      <form className="payment-form" onSubmit={handlePayment}>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="text"
          maxLength="16"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))}
          placeholder="1111222233334444"
          required
        />

        <div className="small-inputs">
          <div>
            <label htmlFor="expiry">Expiry (MM/YY)</label>
            <input
              id="expiry"
              type="text"
              maxLength="5"
              value={expiry}
              onChange={e => setExpiry(e.target.value)}
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              type="password"
              maxLength="3"
              value={cvv}
              onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
              placeholder="123"
              required
            />
          </div>
        </div>

        <label htmlFor="nameOnCard">Name on Card</label>
        <input
          id="nameOnCard"
          type="text"
          value={nameOnCard}
          onChange={e => setNameOnCard(e.target.value)}
          placeholder="Your Name"
          required
        />

        <button type="submit" className="btn-pay" disabled={processing}>
          {processing ? 'Processing…' : `Pay $${total}`}
        </button>
      </form>
    </div>
  );
}
