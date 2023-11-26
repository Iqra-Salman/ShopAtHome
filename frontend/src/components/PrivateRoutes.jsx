import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  if (!userInfo) {
    return <Navigate to="/auth/login" />;
  }
  if (userInfo) {
    return <Outlet />;
  }
};

export default PrivateRoutes;
