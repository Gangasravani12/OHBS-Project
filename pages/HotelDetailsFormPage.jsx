// src/pages/HotelDetailsFormPage.jsx
import React, { useState, useEffect } from 'react';
import './HotelDetailsFormPage.css';
import hotelService from '../api/hotelService';  // backend integration

// Reuse amenities list
const AMENITIES = ['Free WiFi','Pool','Breakfast','Parking','Spa','Gym'];

export default function HotelDetailsFormPage({ hotelId }) {
  const [hotelImages, setHotelImages] = useState([]);
  const [amenities, setAmenities]   = useState([]);
  const [roomTypes, setRoomTypes]   = useState([
    { id: Date.now(), name: '', price: '', image: null, preview: null }
  ]);
  const [error, setError]           = useState('');

  // Load existing hotel details if editing
  useEffect(() => {
    async function loadDetails() {
      if (!hotelId) return;
      try {
        const data = await hotelService.getById(hotelId);
        setHotelImages(data.images.map(url => ({ file: null, url })));
        setAmenities(data.amenities || []);
        setRoomTypes(
          (data.roomTypes || []).map(rt => ({
            id: rt.id,
            name: rt.name,
            price: rt.price,
            image: null,
            preview: rt.imageUrl
          }))
        );
      } catch (e) {
        console.warn('Failed to load hotel details', e);
      }
    }
    loadDetails();
  }, [hotelId]);

  // Handlers: hotel images
  const handleHotelImages = e => {
    setError('');
    const files = Array.from(e.target.files).slice(0, 10);
    const invalid = files.find(f => !/image\/(jpeg|png)/.test(f.type));
    if (invalid) return setError('Only JPEG or PNG files allowed.');
    setHotelImages(files.map(f => ({ file: f, url: URL.createObjectURL(f) })));
  };

  // Toggle amenity selection
  const toggleAmenity = a =>
    setAmenities(prev =>
      prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
    );

  // Room field updates
  const handleRoomChange = (id, field, val) =>
    setRoomTypes(prev =>
      prev.map(rt => rt.id === id ? { ...rt, [field]: val } : rt)
    );

  const handleRoomImage = (id, file) => {
    if (file && !/image\/(jpeg|png)/.test(file.type)) {
      return setError('Room images must be JPEG or PNG.');
    }
    setRoomTypes(prev =>
      prev.map(rt =>
        rt.id === id
          ? { ...rt, image: file, preview: file ? URL.createObjectURL(file) : null }
          : rt
      )
    );
  };

  const addRoomType = () =>
    setRoomTypes(prev => [
      ...prev,
      { id: Date.now(), name: '', price: '', image: null, preview: null }
    ]);
  const removeRoomType = id =>
    setRoomTypes(prev => prev.filter(rt => rt.id !== id));

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!hotelImages.length) return setError('Upload at least one hotel image.');
    if (!amenities.length)   return setError('Select at least one amenity.');
    for (let rt of roomTypes) {
      if (!rt.name || !rt.price || !rt.image)
        return setError('Each room needs a name, price, and image.');
    }

    // Build payload
    const payload = { images: [], amenities, roomTypes: [] };
    hotelImages.forEach(h => payload.images.push(h.file));
    roomTypes.forEach(rt => payload.roomTypes.push({
      id: rt.id,
      name: rt.name,
      price: rt.price,
      image: rt.image
    }));

    try {
      if (hotelId) {
        await hotelService.update(payload);
      } else {
        await hotelService.create(payload);
      }
      alert('Hotel details saved!');
    } catch (err) {
      console.error(err);
      setError('Failed to save details.');
    }
  };

  return (
    <div className="hotel-details-form">
      <h2>Hotel Details</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Hotel Images */}
        <label>Hotel Images (max 10)</label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          multiple
          onChange={handleHotelImages}
        />
        <div className="hotel-images-preview">
          {hotelImages.map((h,i) => (
            <img key={i} src={h.url} alt={`Hotel ${i+1}`} />
          ))}
        </div>

        {/* Amenities */}
        <fieldset className="amenities-fieldset">
          <legend>Select Amenities</legend>
          {AMENITIES.map(a => (
            <label key={a}>
              <input
                type="checkbox"
                checked={amenities.includes(a)}
                onChange={() => toggleAmenity(a)}
              /> {a}
            </label>
          ))}
        </fieldset>

        {/* Room Types */}
        <div className="room-types">
          <h3>Room Types</h3>
          {roomTypes.map((rt, idx) => (
            <div key={rt.id} className="room-type-card">
              <div className="room-type-header">
                <h4>Room {idx+1}</h4>
                {roomTypes.length>1 && (
                  <button type="button" className="remove-btn" onClick={() => removeRoomType(rt.id)}>
                    &times;
                  </button>
                )}
              </div>
              <label>Name</label>
              <input type="text" value={rt.name} onChange={e => handleRoomChange(rt.id, 'name', e.target.value)} />
              <label>Price per Night</label>
              <input type="number" value={rt.price} onChange={e => handleRoomChange(rt.id, 'price', e.target.value)} />
              <label>Room Image</label>
              <input type="file" accept="image/jpeg,image/png" onChange={e => handleRoomImage(rt.id, e.target.files[0])} />
              {rt.preview && <img className="room-image-preview" src={rt.preview} alt={`Room ${idx+1}`} />}
            </div>
          ))}
          <button type="button" className="add-room-btn" onClick={addRoomType}>+ Add Room Type</button>
        </div>

        {/* Submit */}
        <button type="submit" className="submit-btn">Submit Details</button>
      </form>
    </div>
  );
}