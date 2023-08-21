import React, { useState, useEffect } from "react";
import VehiclesList from "./components/VehiclesList";
import VehiclesGrid from "./components/VehiclesGrid";
import { BsGrid, BsListUl } from "react-icons/bs";
import "../../../assets/css/vehicles.css";
import axios from "axios";

const VehiclesAdmin = () => {
  const [isListView, setIsListView] = useState(true);
  const [data, setData] = useState([]);
  const handleListView = () => {
    setIsListView(true);
  };

  const handleGridView = () => {
    setIsListView(false);
  };

  useEffect(() => {
    fetchVehicleData();
  }, []);

  //Fetching all data
  const fetchVehicleData = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/customers/vehicles/get-all-vehicle`
      )
      .then((res) => {
        const formattedData = res.data.data.map((item, index) => ({
          ...item,
          serialNo: index + 1,
        }));
        console.log(formattedData);
        setData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-dark text-xl font-bold dark:text-white">
          Vehicles
        </h4>

        <div>
          <button
            className={`${
              isListView === true
                ? "list-btn bg-gray-150 px-3 py-2  dark:bg-gray-700  "
                : "list-btn bg-white px-3 py-2  dark:bg-gray-150 "
            }`}
            onClick={handleListView}
          >
            <BsListUl />
          </button>
          <button
            className={`${
              isListView === false
                ? "grid-btn bg-gray-150 px-3 py-2  dark:bg-gray-700  "
                : "grid-btn bg-white px-3 py-2  dark:bg-gray-150 "
            }`}
            onClick={handleGridView}
          >
            <BsGrid />
          </button>
        </div>
      </div>
      {!isListView && <VehiclesGrid data={data} />}
      {isListView && (
        <div className="opacity-100 transition-opacity duration-500">
          <VehiclesList data={data} />
        </div>
      )}
    </>
  );
};

export default VehiclesAdmin;
