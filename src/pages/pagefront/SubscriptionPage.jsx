import React from "react";
import HomeNavbar from '../../components/componentFront/HomeNavbar';
import HeaderSection from "../../components/componentFront/subscription/HeaderSection";
import BookingSection from "../../components/componentFront/subscription/BookingSection";
import SubscriptionSection from "../../components/componentFront/subscription/SubscriptionSection";
import Footer from "../../components/componentFront/Footer";
import BackToTopButton from "../../components/componentFront/BackToTopButton";
import GeneralLayout from "../../layouts/GeneralLayout";
const SubscriptionPage = () => {
  return (
    <>
    <GeneralLayout>
    <HeaderSection />
    <BookingSection />
    <SubscriptionSection />
    </GeneralLayout>
    </>
  );
};

export default SubscriptionPage;
