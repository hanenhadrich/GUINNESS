
import { Outlet } from "react-router-dom";
import HomeNavbar from "../components/componentFront/HomeNavbar";
import Footer from "../components/componentFront/Footer";
import BackToTopButton from "../components/BackToTopButton";

const GeneralLayout = () => {
  return (
    <>
      <HomeNavbar />
          <main className="p-0 m-0">
            <Outlet />
          </main>
        <Footer />
      <BackToTopButton />
    </>
  );
};

export default GeneralLayout;
