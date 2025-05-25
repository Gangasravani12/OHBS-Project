import React from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  // Dummy user info
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://via.placeholder.com/100?text=JD'
  };
  const navigate = useNavigate();

  const goToUpdatePage = () => {
    navigate('/profile/update');
  };


  // Dummy bookings
  const bookings = [
    {
      id: 1,
      hotel: 'Sunset Resort',
      checkIn: '2025-04-10',
      checkOut: '2025-04-15',
      status: 'past'
    },
    {
      id: 2,
      hotel: 'Mountain Lodge',
      checkIn: '2025-05-05',
      checkOut: '2025-05-10',
      status: 'upcoming'
    },
    {
      id: 3,
      hotel: 'City Center Inn',
      checkIn: '2025-06-01',
      checkOut: '2025-06-04',
      status: 'upcoming'
    }
  ];

  const past = bookings.filter(b => b.status === 'past');
  const upcoming = bookings.filter(b => b.status === 'upcoming');

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={user.avatarUrl} alt={user.name} className="profile-avatar" />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      <button onClick={goToUpdatePage} className="btn-update-profile">
        Update Profile
      </button>


      {/* <div className="bookings-section">
        <h3>Upcoming Bookings</h3>
        {upcoming.length ? (
          <ul>
            {upcoming.map(b => (
              <li key={b.id}>
                <strong>{b.hotel}</strong><br/>
                {b.checkIn} → {b.checkOut}
              </li>
            ))}
          </ul>
        ) : <p>No upcoming bookings.</p>}

        <h3>Past Bookings</h3>
        {past.length ? (
          <ul>
            {past.map(b => (
              <li key={b.id}>
                <strong>{b.hotel}</strong><br/>
                {b.checkIn} → {b.checkOut}
              </li>
            ))}
          </ul>
        ) : <p>No past bookings.</p>}
      </div>*/}
    </div> 
  );
}
