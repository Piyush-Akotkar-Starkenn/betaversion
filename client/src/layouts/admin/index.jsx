import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar_admin";
import Footer from "components/footer/Footer";
import { routes_admin } from "routes.js";
import TopButton from "./scrolltop";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  useEffect(() => {
    getActiveRoute(routes_admin);
  }, [location.pathname]);

  const getActiveRoute = (routes_admin) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes_admin.length; i++) {
      if (
        window.location.href.indexOf(
          routes_admin[i].layout + "/" + routes_admin[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes_admin[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}

      <div className="h-full w-full bg-Primary dark:!bg-navy-900">
        {/* Main Content */}
        <Navbar
          onOpenSidenav={() => setOpen(true)}
          brandText={currentRoute}
          secondary={getActiveNavbar(routes_admin)}
          {...rest}
        />
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[125px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes_admin)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <TopButton />
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
