import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./auth/SignIn";
import Profile from "./auth/Profile";
import CustomerLayout from "layouts/customer";
import AdminLayout from "layouts/admin";
import Report from "./customer/reports/components/Report";
import CustomerProtected from "authorization/CustomerProtected";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="profile" element={<Profile />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="customer/*" element={<CustomerLayout />} />
      <Route
        path="customer/report/"
        element={
          <CustomerProtected>
            <Report />
          </CustomerProtected>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
