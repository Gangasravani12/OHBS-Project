import React from 'react';
import './FormInput.css';

const FormInput = ({ label, type, name, value, onChange, placeholder, error }) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <small className="error">{error}</small>}
    </div>
  );
};

export default FormInput;
// This code defines a FormInput component that renders a labeled input field with error handling. The component accepts props for the label, input type, name, value, onChange handler, placeholder text, and any error message. If an error message is provided, it is displayed below the input field in a small font. The component is styled using an external CSS file (FormInput.css) to ensure a consistent look and feel across the application. The FormInput component can be reused in various forms throughout the application to maintain a consistent design and functionality.