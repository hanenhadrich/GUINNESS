// layouts/UserLayout.jsx
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/componentBackUser/UserNavBar"; 
import Footer from "../components/componentBack/Footer";
import BackToTopButton from "../components/BackToTopButton";

const UserLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <UserNavbar />
      <main className="flex-grow-1 p-4 mt-4">
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default UserLayout;
