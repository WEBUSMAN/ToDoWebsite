import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const email = localStorage.getItem("useremail");
  return email ? children : <Navigate to="/loginform" />;
};

export default ProtectedRoute;