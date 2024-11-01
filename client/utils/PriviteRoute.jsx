import { Outlet, Navigate } from "react-router-dom";
import { UserAuth } from "../src/Context/AuthContext";
const PriviteRoute = () => {
  const { user } = UserAuth();

  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PriviteRoute;
