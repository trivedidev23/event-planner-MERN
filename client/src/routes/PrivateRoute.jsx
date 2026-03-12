import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return children;
};

export default PrivateRoute;
