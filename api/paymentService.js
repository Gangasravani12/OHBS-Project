// src/api/paymentService.js
import api from './axios';

export default {
  /**
   * Stubbed payment processing.
   * Replace with real payment gateway integration.
   * @param {{ bookingId, amount, cardNumber, expiry, cvv, nameOnCard }} data
   * @returns {Promise<object>}
   */
  async process(data) {
    // Example real call:
    // const res = await api.post('/payments', data);
    // return res.data;

    // Stub: resolve after 1s
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, transactionId: 'tx_123456' });
      }, 1000);
    });
  }
};
