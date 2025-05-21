import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//pagesERROR
import Error401 from './components/Error/Error401'; 
import Error404 from './components/Error/Error404';  
import Error500 from './components/Error/Error500';  
//pagesFRONT
import AboutPage from './pages/pagefront/AboutPage';
import HomePage from './pages/Pagefront/HomePage';
import SubscriptionPage from './pages/pagefront/SubscriptionPage';
import ContactPage from './pages/pagefront/ContactPage';
import SignInPage from './pages/pagefront/SignInPage';
import SignUpPage from './pages/pagefront/SignUpPage';
//pagesBACK
import Home from './pages/pageback/Home';
import Adherents from './pages/pageback/Adherents';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Pages front add layout apres */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/abonnement" element={<SubscriptionPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        {/* Pages BACK add layout apres */}
        <Route path="/compte" element={<Home />} />
        <Route path="/adherents" element={<Adherents />} />
        {/* Pages ERROR*/}
        <Route path="/unauthorized401" element={<Error401 />} />
        <Route path="/servererror500" element={<Error500 />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default App;
