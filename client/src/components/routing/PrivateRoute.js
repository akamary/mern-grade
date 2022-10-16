import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  let auth = localStorage.getItem("authToken");
  console.log(auth);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
