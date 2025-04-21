import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from "./pages/Home";
import Error401 from './components/Error/Error401';
import Error404 from './components/Error/Error404';
import Error500 from './components/Error/Error500';
import ErrorBoundary from './components/ErrorBoundary';
import Adherent from './pages/Adherents';
import Footer from './components/Footer';  // Ajoute cette ligne

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/home" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/adherent" element={
            <Layout>
              <Adherent />
            </Layout>
          } />
          <Route path="/unauthorized401" element={<Error401 />} />
          <Route path="/unauthorized500" element={<Error500 />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
        <Footer /> {/* Ajoute le footer ici */}
      </ErrorBoundary>
    </Router>
  );
};

export default App;
