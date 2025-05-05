
import React from 'react';
import HomeNavbar from '../../components/componentFront/HomeNavbar';
import SlickSlideshow from '../../components/componentFront/home/SlickSlideshow';
import AboutTabs from '../../components/componentFront/home/AboutTabs';
import Footer from "../../components/componentFront/Footer";
import BackToTopButton from "../../components/componentFront/BackToTopButton";
import GeneralLayout from "../../layouts/GeneralLayout";
const HomePage = () => {
  return (
    <>
    <GeneralLayout>
    <SlickSlideshow/>
    <AboutTabs />
    </GeneralLayout>
   </>
  );
};

export default HomePage;
