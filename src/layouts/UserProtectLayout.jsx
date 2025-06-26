import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserProtectLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const role = user?.role;

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (role !== "user") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default UserProtectLayout;
