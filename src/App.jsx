import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import GeneralLayout from './layouts/GeneralLayout';
import ProtectLayout from './layouts/ProtectLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages public
import HomePage from './pages/pagefront/HomePage';
import AboutPage from './pages/pagefront/AboutPage';
import SubscriptionPage from './pages/pagefront/SubscriptionPage';
import ContactPage from './pages/pagefront/ContactPage';
import SignInPage from './pages/pagefront/SignInPage';
import SignUpPage from './pages/pagefront/SignUpPage';

// Pages privées
import Home from './pages/pageback/Home';
import Adherents from './pages/pageback/Adherents';
import SubscriptionSemaine from './pages/pageback/SubscriptionSemaine';
// Pages erreur
import Error401 from './components/Error/Error401';
import Error404 from './components/Error/Error404';
import Error500 from './components/Error/Error500';


const App = () => {
  return (
    <Router>
      <Routes>

        {/* Routes publiques avec GeneralLayout */}
        <Route element={<GeneralLayout/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/abonnement" element={<SubscriptionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        {/* Routes protégées avec DashboardLayout */}
        <Route element={<ProtectLayout />}>
          <Route element={<DashboardLayout />}>
            <Route path="/compte" element={<Home />} />
            <Route path="/adherents" element={<Adherents />} />
            <Route path="/abonnement/semaine" element={<SubscriptionSemaine/>} />
            
          </Route>
        </Route>

        {/* Pages d'erreur */}
        <Route path="/unauthorized401" element={<Error401 />} />
        <Route path="/servererror500" element={<Error500 />} />
        <Route path="*" element={<Error404 />} />

      </Routes>
    </Router>
  );
};

export default App;
