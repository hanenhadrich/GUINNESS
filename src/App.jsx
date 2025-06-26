import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import GeneralLayout from './layouts/GeneralLayout';
import DashboardLayout from './layouts/DashboardLayout';
import UserLayout from './layouts/UserLayout';

// Protection
import AdminProtectLayout from './layouts/AdminProtectLayout';
import UserProtectLayout from './layouts/UserProtectLayout';

// Pages publiques
import HomePage from './pages/pagefront/HomePage';
import AboutPage from './pages/pagefront/AboutPage';
import SubscriptionPage from './pages/pagefront/SubscriptionPage';
import ContactPage from './pages/pagefront/ContactPage';
import SignInPage from './pages/pagefront/SignInPage';
import SignUpPage from './pages/pagefront/SignUpPage';

// Pages privées admin
import Home from './pages/pageback/Home';
import Adherents from './pages/pageback/Adherents';
import SubscriptionSemaine from './pages/pageback/SubscriptionSemaine';
import SubscriptionMois from './pages/pageback/SubscriptionMois';
import SubscriptionAutre from './pages/pageback/SubscriptionAutre';
import ReclamationsPage from './pages/pageback/ReclamationsPage';

// Pages privées utilisateur simple
import UserDashboard from './pages/UserDashboard';


// Pages d'erreur
import Error401 from './components/Error/Error401';
import Error404 from './components/Error/Error404';
import Error500 from './components/Error/Error500';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route element={<GeneralLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/abonnement" element={<SubscriptionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        {/* Routes protégées ADMIN */}
        <Route element={<AdminProtectLayout />}>
          <Route element={<DashboardLayout />}>
            <Route path="/compte" element={<Home />} />
            <Route path="/adherents" element={<Adherents />} />
            <Route path="/abonnement/semaine" element={<SubscriptionSemaine />} />
            <Route path="/abonnement/mois" element={<SubscriptionMois />} />
            <Route path="/abonnement/autre" element={<SubscriptionAutre />} />
            <Route path="/reclamations" element={<ReclamationsPage />} />
          </Route>
        </Route>

        {/* Routes protégées USER */}
        <Route element={<UserProtectLayout />}>
          <Route element={<UserLayout />}>
            <Route path="/user" element={<UserDashboard/>} />
           
          </Route>
        </Route>

        {/* Pages d'erreurs */}
        <Route path="/unauthorized401" element={<Error401 />} />
        <Route path="/servererror500" element={<Error500 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default App;
