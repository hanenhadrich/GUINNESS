import React from "react";
import HomeNavbar from '../../components/componentFront/HomeNavbar';
import ContactSection from "../../components/componentFront/contact/ContactSection";
import Header from "../../components/componentFront/contact/Header";
import Footer from "../../components/componentFront/Footer";
import BackToTopButton from "../../components/componentFront/BackToTopButton";
import GeneralLayout from "../../layouts/GeneralLayout";
const ContactPage = () => {
  return (
    <>
    <GeneralLayout>
      
      <Header />
      <ContactSection />
      
      </GeneralLayout>
    </>
  );
};

export default ContactPage;
