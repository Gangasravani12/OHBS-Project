import React, { useState } from 'react';
import { useToast } from '../components/ToastProvider';
import '../components/FormInput.css';
import './NotificationSettingsPage.css';

export default function NotificationSettingsPage() {
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [bookingAlerts, setBookingAlerts] = useState(false);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const handleSave = () => {
    setSaving(true);
    // Stubbed save action
    new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => {
        toast.success('Notification settings saved!');
      })
      .catch(() => {
        toast.error('Failed to save settings.');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <div className="notification-settings-page">
      <h2>Notification Settings</h2>
      <div className="form-group">
        <label className="switch">
          <input
            type="checkbox"
            checked={priceAlerts}
            onChange={e => setPriceAlerts(e.target.checked)}
            disabled={saving}
          />
          <span className="slider round"></span>
        </label>
        <span className="label-text">Price Drop Alerts</span>
      </div>

      <div className="form-group">
        <label className="switch">
          <input
            type="checkbox"
            checked={bookingAlerts}
            onChange={e => setBookingAlerts(e.target.checked)}
            disabled={saving}
          />
          <span className="slider round"></span>
        </label>
        <span className="label-text">Booking Confirmations</span>
      </div>

      <button
        className="save-btn"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? 'Saving…' : 'Save Settings'}
      </button>
    </div>
  );
}
