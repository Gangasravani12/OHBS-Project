// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">RoomNest</div>
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/hotels">Hotels</Link>
        <Link to="/login" className="btn-nav">Login</Link>
        {/* <Link to="/profile">Profile</Link> */}

        {/* Account dropdown */}
        <Menu as="div" className="dropdown">
          <Menu.Button className="dropdown-button">Account ▼</Menu.Button>
          <Menu.Items className="dropdown-menu">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`dropdown-item${active ? ' active' : ''}`}
                >
                  My Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/bookings"
                  className={`dropdown-item${active ? ' active' : ''}`}
                >
                  My Bookings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/settings/notification"
                  className={`dropdown-item${active ? ' active' : ''}`}
                >
                  Notification Settings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/logout"
                  className={`dropdown-item${active ? ' active' : ''}`}
                >
                  Logout
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
}
