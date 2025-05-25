// src/pages/HotelsPage.jsx
import React, { useState, useEffect } from 'react';
import SearchFormHero from '../components/SearchFormHero';
import FilterSidebar from '../components/FilterSidebar';
import SortBar from '../components/SortBar';
import HotelList from '../components/HotelList';
import hotelService from '../api/hotelService';
import { hotels as sampleHotels } from '../data/hotels.js';
import './HotelsPage.css';

export default function HotelsPage() {
  const [rawData, setRawData] = useState([]);
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      price:     2000,
      stars:     [],
      amenities: [],
      location:  params.get('location') || '',
      guests:    Number(params.get('guests')) || 1,
    };
  });
  const [sortBy, setSortBy] = useState('price');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1️⃣ Load hotels (try API → fallback to static)
  useEffect(() => {
    const loadHotels = async () => {
      try {
        setLoading(true);
        const data = await hotelService.getAll(filters, sortBy);
        setRawData(data);
      } catch (e) {
        console.warn('API failed, using static hotels.', e);
        setRawData(sampleHotels);
        setError('⚠️ Offline mode: showing sample hotels.');
      } finally {
        setLoading(false);
      }
    };
    loadHotels();
  }, []);

  // 2️⃣ Filtering + Sorting Logic
  useEffect(() => {
    const tokens = filters.location.trim().toLowerCase().split(/\s+/);

    let filtered = rawData.filter(hotel => {
      const text = `${hotel.name} ${hotel.location}`.toLowerCase();

      const matchesSearch = tokens.every(tok => text.includes(tok));
      const matchesPrice = hotel.pricePerNight <= filters.price;
      const matchesStars = filters.stars.length
        ? filters.stars.includes(hotel.stars)
        : true;
      const matchesAmenities = filters.amenities.every(a =>
        hotel.amenities.includes(a)
      );

      return matchesSearch && matchesPrice && matchesStars && matchesAmenities;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'price') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'rating') return b.stars - a.stars;
      return 0;
    });

    setResults(filtered);
  }, [rawData, filters, sortBy]);

  // 3️⃣ Handlers
  const handleSearch = ({ location, guests }) => {
    setFilters(prev => ({
      ...prev,
      location,
      guests,
    }));
  };

  const handleFilter = updated => {
    setFilters(prev => ({
      ...prev,
      ...updated,
    }));
  };

  const handleSort = key => {
    setSortBy(key);
  };

  // 4️⃣ Render
  return (
    <>
      <section className="hotels-search-section">
        <SearchFormHero onSearch={handleSearch} />
      </section>

      {loading && <p className="loading">Loading hotels…</p>}
      {error && <p className="error">{error}</p>}

      <div className="hotels-page">
        <FilterSidebar filters={filters} onChange={handleFilter} />

        <div className="listings-area">
          <SortBar sortBy={sortBy} onSort={handleSort} />
          <HotelList hotels={results} />
        </div>
      </div>
    </>
  );
}
