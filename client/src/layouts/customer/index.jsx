import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar_customer";
import Footer from "components/footer/Footer";
import { routes_customer } from "routes.js";
import TopButton from "./scrolltop";

export default function CustomerLayout(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes_customer);
  }, [location.pathname]);

  const getActiveRoute = (routes_customer) => {
    let activeRoute = "Dashboard";
    for (let i = 0; i < routes_customer.length; i++) {
      if (
        window.location.href.indexOf(
          routes_customer[i].layout + "/" + routes_customer[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes_customer[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes_customer) => {
    let activeNavbar = false;
    for (let i = 0; i < routes_customer.length; i++) {
      if (
        window.location.href.indexOf(
          routes_customer[i].layout + routes_customer[i].path
        ) !== -1
      ) {
        return routes_customer[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes_customer) => {
    return routes_customer.map((prop, key) => {
      if (prop.layout === "/customer") {
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
          secondary={getActiveNavbar(routes_customer)}
          {...rest}
        />
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[125px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes_customer)}

                <Route
                  path="/"
                  element={<Navigate to="/customer/default" replace />}
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
