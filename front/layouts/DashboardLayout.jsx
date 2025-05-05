import React from 'react';
import Sidebar from '../components/componentBack/Sidebar/Sidebar';
import Navbar from '../components/componentBack/Navbar';
import Footer from '../components/componentBack/Footer';
import '../css/styles.css';
const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <main className="p-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
