
import React from 'react';
import HomeNavbar from '../../components/componentFront/HomeNavbar';
import Footer from "../../components/componentFront/Footer";
import BackToTopButton from "../../components/componentFront/BackToTopButton";
import SignInForm from '../../components/componentFront/SignInForm';
import GeneralLayout from "../../layouts/GeneralLayout";
const HomePage = () => {
  return (
    <>
    <GeneralLayout>
    <SignInForm />
    </GeneralLayout>
   </>
  );
};

export default HomePage;
