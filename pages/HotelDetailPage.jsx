// src/pages/HotelDetailPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../components/Button.jsx';
import { hotels as sampleHotels } from '../data/hotels.js';
import hotelService from '../api/hotelService';
import bookingService from '../api/bookingService';
import './HotelDetailPage.css';

export default function HotelDetailPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Carousel
  const emblaOptions = useMemo(() => ({ loop: false }), []);
  const [viewportRef, emblaApi] = useEmblaCarousel(emblaOptions);

  // Fetch hotel by ID (backend fallback to static)
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const fetchedHotel = await hotelService.getById(id);
        setHotel(fetchedHotel);
      } catch (e) {
        const fallbackHotel = sampleHotels.find(h => h.id === id);
        setHotel(fallbackHotel || null);
        console.warn('Using static hotel data', e);
      }
    };
    fetchHotel();
  }, [id]);

  // Calculate total
  useEffect(() => {
    if (startDate && endDate && hotel) {
      const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      setTotal(nights > 0 ? nights * hotel.pricePerNight * guests : 0);
    }
  }, [startDate, endDate, guests, hotel]);

  const handleConfirm = () => {
    setError('');
    if (!startDate || !endDate) return setError('Select both dates');
    if (endDate <= startDate) return setError('Check‑out after check‑in');
    if (guests < 1) return setError('At least one guest');

     (async () => {
      try {
        const booking = await bookingService.create({
          hotelId: hotel.id,
          startDate,
          endDate,
          guests
        });
        navigate('/payment', { state: { booking, total } });
      } catch (err) {
        setError(err.response?.data?.message || 'Booking failed');
      }
    })();
   };

  if (!hotel) return <div className="loading">Loading…</div>;

  return (
    <div className="hotel-detail-page">
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {hotel.photos.map((src, i) => (
              <div className="embla__slide" key={i}>
                <img src={src} alt={`${hotel.name} ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <button className="embla__button embla__button--prev" onClick={() => emblaApi?.scrollPrev()}>
          ‹
        </button>
        <button className="embla__button embla__button--next" onClick={() => emblaApi?.scrollNext()}>
          ›
        </button>
      </div>

      <div className="detail-main">
        <div className="detail-left">
          <h1 className="hotel-title">{hotel.name}</h1>
          <div className="hotel-meta">
            {'★'.repeat(hotel.stars)} · {hotel.location}
          </div>

          <div className="tabs">
            {['overview', 'amenities', 'reviews'].map(tab => (
              <button
                key={tab}
                className={activeTab === tab ? 'tab active' : 'tab'}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && <p className="overview-text">{hotel.overview}</p>}
            {activeTab === 'amenities' && (
              <div className="amenities-grid">
                {hotel.amenities.map((am, i) => (
                  <div key={i} className="amenity-item">{am}</div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && <p className="reviews-placeholder">No reviews yet.</p>}
          </div>
        </div>

        <div className="detail-right">
          <div className="booking-panel">
            <h3>Your Stay</h3>
            {error && <p className="error">{error}</p>}
            <label>Check‑in</label>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart startDate={startDate} endDate={endDate}
            />
            <label>Check‑out</label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd startDate={startDate} endDate={endDate}
              minDate={startDate}
            />
            <label>Guests</label>
            <select value={guests} onChange={e => setGuests(+e.target.value)}>
              {[1, 2, 3, 4].map(n => (
                <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
              ))}
            </select>
            <div className="price-box">
              <span>${hotel.pricePerNight}/night</span>
              <span>Total: <strong>${total}</strong></span>
            </div>
            <Button onClick={handleConfirm}>Confirm Booking</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
