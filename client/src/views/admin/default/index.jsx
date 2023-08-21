import { useEffect, useState } from "react";
import axios from "axios";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import { MdWebhook } from "react-icons/md";
import { BsTruck, BsFillCpuFill } from "react-icons/bs";
import Widget from "components/widget/Widget";
import Cookies from "js-cookie";

const Dashboard = () => {
  let token = Cookies.get("token");

  const [vehiclesCount, setVehiclesCount] = useState();
  const [devicesCount, setDevicesCount] = useState();
  const [customersCount, setCustomersCount] = useState();

  // Fetching total vehicle's count
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/vehicles/total-vehicles`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        // console.log(res);
        setVehiclesCount(res.data.result[0].count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Fetching total device's count
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/devices/total-devices`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data.result[0].count);
        setDevicesCount(res.data.result[0].count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  // Fetching total customer's count
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/customers/total-customers`, {
        headers: { authorization: `bearer ${token}` },
      })

      .then((res) => {
        console.log(res);
        setCustomersCount(res.data.result[0].count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h4 className="text-dark text-xl font-bold dark:text-white">Dashboard</h4>

      {/* Card widget */}

      <div className="mt-3 flex flex-wrap justify-center gap-12">
        <Widget
          icon={<BsTruck className="h-7 w-7" />}
          title={"Customers"}
          subtitle={customersCount}
          cardhref={"/admin/customers"}
        />
        <Widget
          icon={<BsFillCpuFill className="h-6 w-6" />}
          title={"Devices"}
          subtitle={devicesCount}
          cardhref={"/admin/devices"}
        />
        <Widget
          icon={<MdWebhook className="h-7 w-7" />}
          title={"Vehicles"}
          subtitle={vehiclesCount}
          cardhref={"/admin/vehicles"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2">
        <div className="mb-5 md:mb-0">
          <TotalSpent />
          <br />
          <TotalSpent />
        </div>
        <div>
          <WeeklyRevenue />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
