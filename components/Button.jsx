import React from 'react';
import './Button.css';

const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <button className="btn" onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
// This code defines a Button component that renders a styled button element. The component accepts props for the button's label (children), an onClick handler, and the button type (defaulting to 'button'). The button is styled using an external CSS file (Button.css) to ensure a consistent look and feel across the application. The Button component can be reused throughout the application to maintain a consistent design and functionality for all buttons.