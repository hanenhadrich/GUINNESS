import React from 'react';
import Sidebar from '../components/componentBack/Sidebar/Sidebar';
import Footer from '../components/componentBack/Footer';
import '../css/slick.css';
import '../css/guinnessstyle.css';
import '../css/App.css';
import '../css/index.css';
import '../css/styles.css';
const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Sidebar />

      <main className="flex-grow-1 p-4" style={{ overflowY: 'auto', marginTop: '4rem' }}>
        {children}
      </main>


      <Footer />
    </div>
  );
};

export default DashboardLayout;
