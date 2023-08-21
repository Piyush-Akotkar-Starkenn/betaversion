import React, { useState } from "react";
import VehiclesList from "./components/VehiclesList";
import VehiclesGrid from "./components/VehiclesGrid";
import { BsGrid, BsListUl } from "react-icons/bs";

const Marketplace = () => {
  const [isListView, setIsListView] = useState(true);

  const handleListView = () => {
    setIsListView(true);
  };

  const handleGridView = () => {
    setIsListView(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <h4 className="text-dark text-xl font-bold dark:text-white">
          Vehicles
        </h4>
        <div>
          {/* <button
            className={`list-btn bg-white px-3 py-2  dark:bg-gray-150  ${
              isListView ? "bg-gray-150 dark:bg-gray-500" : ""
            }`}
            onClick={handleListView}
          >
            <BsListUl />
          </button> */}
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
      {!isListView && <VehiclesGrid />}
      {isListView && (
        <div className="opacity-100 transition-opacity duration-500">
          <VehiclesList />
        </div>
      )}
    </>
  );
};

export default Marketplace;
