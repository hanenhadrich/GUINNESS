
import React from 'react';
import HomeNavbar from '../components/componentFront/HomeNavbar';
import Footer from '../components/componentFront/Footer';
import BackToTopButton from '../components/componentFront/BackToTopButton';
//css
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/slick.css';
import '../css/guinnessstyle.css';
import '../css/App.css';
import '../css/index.css';
import '../css/styles.css';
const GeneralLayout = ({ children }) => {
  return (
    <>
      <HomeNavbar />
      {children}
      <Footer />
      <BackToTopButton />
    </>
  );
};

export default GeneralLayout;
