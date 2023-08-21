import React from "react";

// Admin Imports
import Dashboard from "views/admin/default";
import VehiclesAdmin from "views/admin/vehicles";
import DevicesAdmin from "views/admin/devices";
import AnalyticsThreshold from "views/admin/analytics_threshold";
import FeatureSet from "views/admin/feature_set";
import Customers from "views/admin/customers";
// Customer Imports
import MainDashboard from "views/customer/default";
import Vehicles from "views/customer/vehicles";
import RFIDs from "views/customer/rfids";
import Devices from "views/customer/devices";
import OngoingTrips from "views/customer/ongoing";
import Triggers from "views/customer/alert-triggers";
import Contacts from "views/customer/contacts";
import CompletedTrips from "views/customer/completed";
import Reports from "views/customer/reports";

// Icon Imports
import {
  MdOutlineDashboard,
  MdWebhook,
  MdOutlineFeaturedPlayList,
  MdContactPhone,
} from "react-icons/md";
import { BsTruck, BsFillCpuFill } from "react-icons/bs";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { RiAlertLine, RiContactsLine } from "react-icons/ri";
import { TbReport, TbDeviceAnalytics } from "react-icons/tb";
import { BiRfid } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import AdminProtected from "authorization/AdminProteted";
import CustomerProtected from "authorization/CustomerProtected";
import { DiDatabase } from "react-icons/di";

//routes for Admin panel
export const routes_admin = [
  {
    name: "",
    title: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdOutlineDashboard className="h-7 w-7" />,
    component: (
      <AdminProtected>
        <Dashboard />
      </AdminProtected>
    ),
  },
  {
    name: "",
    title: "Customers",
    layout: "/admin",
    path: "customers",
    icon: <HiOutlineUsers className="h-7 w-7" />,
    component: (
      <AdminProtected>
        <Customers />
      </AdminProtected>
    ),
  },
  {
    name: "",
    title: "Devices",
    layout: "/admin",
    icon: <BsFillCpuFill className="h-7 w-7" />,
    path: "devices",
    component: (
      <AdminProtected>
        <DevicesAdmin />
      </AdminProtected>
    ),
  },
  {
    name: "",
    title: "Vehicles",
    layout: "/admin",
    path: "vehicles",
    icon: <BsTruck className="h-7 w-7" />,
    component: (
      <AdminProtected>
        <VehiclesAdmin />
      </AdminProtected>
    ),
    secondary: true,
  },

  {
    name: "",
    title: "Feature Set",
    layout: "/admin",
    path: "feature-set",
    icon: <MdOutlineFeaturedPlayList className="h-7 w-7" />,
    component: (
      <AdminProtected>
        <FeatureSet />
      </AdminProtected>
    ),
  },
  {
    name: "",
    title: "Analytics Threshold",
    layout: "/admin",
    path: "analytics-threshold",
    icon: <TbDeviceAnalytics className="h-7 w-7" />,
    component: (
      <AdminProtected>
        <AnalyticsThreshold />
      </AdminProtected>
    ),
  },
];

//routes for Customer panel
export const routes_customer = [
  {
    name: "",
    title: "Dashboard",
    layout: "/customer",
    path: "dashboard",
    icon: <MdOutlineDashboard className="h-7 w-7" />,
    component: (
      <CustomerProtected>
        <MainDashboard />
      </CustomerProtected>
    ),
  },
  {
    name: "",
    title: "Devices",
    layout: "/customer",
    icon: <BsFillCpuFill className="h-7 w-7" />,
    path: "devices",
    component: (
      <CustomerProtected>
        <Devices />
      </CustomerProtected>
    ),
  },
  {
    name: "",
    title: "Drivers",
    layout: "/customer",
    path: "Drivers",
    icon: <RiContactsLine className="h-7 w-7" />,
    component: (
      <CustomerProtected>
        <RFIDs />
      </CustomerProtected>
    ),
  },
  {
    name: "",
    title: "Vehicles",
    layout: "/customer",
    path: "vehicles",
    icon: <BsTruck className="h-7 w-7" />,
    component: (
      <CustomerProtected>
        <Vehicles />
      </CustomerProtected>
    ),
    secondary: true,
  },
  {
    name: "",
    title: "Vehicle Logs",
    layout: "/customer",
    path: "vehicle-logs",
    icon: <DiDatabase className="h-7 w-7" />,
    component: (
      <CustomerProtected>
        <RFIDs />
      </CustomerProtected>
    ),
  },
  {
    name: "",
    title: "Ongoing Trips",
    layout: "/customer",
    path: "ongoing-trips",
    icon: <MdWebhook className="h-7 w-7" />,
    component: (
      <CustomerProtected>
        <OngoingTrips />
      </CustomerProtected>
    ),
  },
  {
    name: "",
    title: "Completed Trips",
    layout: "/customer",
    path: "completed-trips",
    icon: <AiOutlineCheckSquare className="h-7 w-7" />,
    component: (
      <CustomerProtected>
        <CompletedTrips />
      </CustomerProtected>
    ),
  },
  {
    name: "",
    title: "Alert Triggers",
    layout: "/customer",
    path: "alert-triggers",
    icon: <RiAlertLine className="h-7 w-7" />,
    component: (
      <CustomerProtected>
        <Triggers />
      </CustomerProtected>
    ),
  },
  {
    name: "",
    title: "RFIDs",
    layout: "/customer",
    path: "RFIDs",
    icon: <BiRfid className="h-7 w-7" />,
    component: (
      <CustomerProtected>
        <RFIDs />
      </CustomerProtected>
    ),
  },
  {
    name: "",
    title: "Reports",
    layout: "/customer",
    path: "reports",
    icon: <TbReport className="h-7 w-7" />,
    component: (
      <CustomerProtected>
        <Reports />
      </CustomerProtected>
    ),
  },
  {
    name: "",
    title: "Contacts",
    layout: "/customer",
    path: "contacts",
    icon: <MdContactPhone className="h-7 w-7" />,
    component: (
      <CustomerProtected>
        <Contacts />
      </CustomerProtected>
    ),
  },
];
