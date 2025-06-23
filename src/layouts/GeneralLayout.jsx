import { Outlet } from "react-router-dom";
import HomeNavbar from '../components/componentFront/HomeNavbar';
import Footer from '../components/componentFront/Footer';
import BackToTopButton from '../components/componentFront/BackToTopButton';

import '../css/slick.css';
import '../css/guinnessstyle.css';
import '../css/App.css';
import '../css/index.css';
import '../css/styles.css';

const GeneralLayout = () => {
  return (
    <>
      <HomeNavbar />
      <main className="p-0 m-0"> {/* Supprime le margin/padding */}
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
};

export default GeneralLayout;
