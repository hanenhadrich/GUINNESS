import React from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import HeroSection from "../../components/componentFront/about/HeroSection";
import Services from "../../components/componentFront/about/Services";
import Testimonial from "../../components/componentFront/about/Testimonial";

const AboutPage = () => {
  return (
    <>
      <HeroSection />
      <Testimonial />
      <Services />
   </> 
  );
};

export default AboutPage;
