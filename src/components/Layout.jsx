
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar/Sidebar';


const Layout = ({ children }) => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          {children}
        </div>
      </div>
      
    </div>
  );
};

export default Layout;
