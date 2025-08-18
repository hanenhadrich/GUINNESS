
import { Outlet } from "react-router-dom";
import Sidebar from "../components/componentBackAdmin/Sidebar/Sidebar";
import Footer from "../components/componentBackAdmin/Footer";
import BackToTopButton from "../components/BackToTopButton";

const DashboardLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Sidebar />
      <main className="flex-grow-1 p-4" style={{ marginTop: "4rem" }}>
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default DashboardLayout;
