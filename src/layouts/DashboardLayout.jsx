import { Outlet } from "react-router-dom";
import Sidebar from '../components/componentBack/Sidebar/Sidebar';
import Footer from '../components/componentBack/Footer';
import BackToTopButton from '../components/componentFront/BackToTopButton';

import '../css/slick.css';
import '../css/guinnessstyle.css';
import '../css/App.css';
import '../css/index.css';
import '../css/styles.css';

const DashboardLayout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Sidebar />
    <main className="flex-grow-1 p-4" style={{ marginTop: '4rem' }}>
      <Outlet />
    </main>
    <Footer />
    <BackToTopButton />
  </div>
);

export default DashboardLayout;
