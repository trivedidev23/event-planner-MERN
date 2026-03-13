import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <AuthLayout />
      {children}
    </>
  );
};

export default PrivateRoute;
