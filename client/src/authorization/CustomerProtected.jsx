import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

const CustomerProtected = ({ children }) => {
  let token = Cookies.get("token");
  let user_type = Cookies.get("user_type");

  if (user_type === "2" && token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default CustomerProtected;
