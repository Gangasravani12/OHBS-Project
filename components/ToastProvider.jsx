// src/components/ToastProvider.jsx
import React, { createContext, useContext, useState } from 'react';
import '../components/ToastProvider.css';  // define .toast, .success, etc.

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const show = (text, variant='success') => {
    const id = Date.now();
    setMessages(msgs => [...msgs, { id, text, variant }]);
    setTimeout(() => setMessages(msgs => msgs.filter(m => m.id !== id)), 4000);
  };

  return (
    <ToastContext.Provider value={{
      success: msg => show(msg, 'success'),
      error:   msg => show(msg, 'error')
    }}>
      {children}
      <div className="toast-container">
        {messages.map(m => (
          <div key={m.id} className={`toast ${m.variant}`}>{m.text}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
