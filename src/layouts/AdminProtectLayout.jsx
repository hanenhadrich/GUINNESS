import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const role = user?.role;

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
};

export default AdminProtectLayout;
