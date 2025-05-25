import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HotelsPage from './pages/HotelsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ManagerLoginPage from './pages/ManagerLoginPage.jsx';
import ManagerRegisterPage from './pages/ManagerRegisterPage.jsx';
import ManagerDashboard from './pages/ManagerDashboard.jsx';
import RoomsStatusPage from './pages/RoomsStatusPage.jsx';
import HotelDetailsFormPage from './pages/HotelDetailsFormPage.jsx';
import HotelDetailPage from './pages/HotelDetailPage.jsx';
import NotificationSettingsPage from './pages/NotificationSettingsPage.jsx';
import Bookings from './pages/Bookings.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import TestAuth from './pages/TestAuth.jsx';
import { ToastProvider } from './components/ToastProvider.jsx';
import ProfileUpdatePage from './pages/ProfileUpdatePage.jsx';


function App() {
  return (
    <Router>
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/hotels/:id" element={<HotelDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/manager/login" element={<ManagerLoginPage />} />
            <Route path="/manager/register" element={<ManagerRegisterPage />} />
            <Route path="/manager/dashboard" element={<ManagerDashboard />} />
            <Route path="/manager/rooms-status" element={<RoomsStatusPage />} />
            <Route path="/manager/hotel-details" element={<HotelDetailsFormPage />} />
            <Route path="/settings/notification" element={<NotificationSettingsPage />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/test-auth" element={<TestAuth />} />
            <Route path="/profile/update" element={<ProfileUpdatePage />} />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Layout>
      </ToastProvider>
    </Router>
  );
}

export default App;
