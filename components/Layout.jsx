import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content">
        {children}
      </div>
    </>
  );
};

export default Layout;
// This code defines a Layout component that includes a Navbar and a content area for rendering child components. The Layout component is used in the main application file to wrap the different pages of the application, providing a consistent layout across all pages. The Navbar component is imported and included at the top of the layout, while the children prop is used to render the specific content for each page within the content area.