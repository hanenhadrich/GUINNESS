
import React from 'react';
import HomeNavbar from '../../components/componentFront/HomeNavbar';
import Footer from "../../components/componentFront/Footer";
import BackToTopButton from "../../components/componentFront/BackToTopButton";
import SignUpForm from '../../components/componentFront/SignUpForm';
import GeneralLayout from "../../layouts/GeneralLayout";
const HomePage = () => {
  return (
    <>
    <GeneralLayout>
    <SignUpForm />
    </GeneralLayout>
   </>
  );
};

export default HomePage;
