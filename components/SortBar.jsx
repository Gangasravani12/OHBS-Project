// src/components/SortBar.jsx
import React from 'react';
import './SortBar.css';

export default function SortBar({ sortBy, onSort }) {
  return (
    <div className="sort-bar">
      <label>
        Sort by:&nbsp;
        <select value={sortBy} onChange={e => onSort(e.target.value)}>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </label>
    </div>
  );
}
// This code defines a SortBar component that allows users to sort items by either price or rating. The component accepts two props: `sortBy`, which indicates the current sorting method, and `onSort`, which is a callback function to handle changes in the sorting method. The component renders a dropdown menu with options for sorting, and when the user selects a different option, it calls the `onSort` function with the new value. The component is styled using an external CSS file (SortBar.css) to ensure a consistent look and feel across the application.