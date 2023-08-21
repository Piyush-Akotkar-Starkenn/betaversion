import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataView } from "primereact/dataview";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { GiMineTruck } from "react-icons/gi";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import VehicleTrips from "./VehicleTrips";
import FeatureSet from "./FeatureSet";
const applyFilters = (filters, allData) => {
  let filteredData = allData;
  //condition to exclude these fields for global search
  if (filters.global.value) {
    filteredData = filteredData.filter((item) =>
      Object.entries(item).some(
        ([key, value]) =>
          key !== "created_at" &&
          key !== "updated_at" &&
          key !== "_id" &&
          key !== "status" &&
          String(value)
            .toLowerCase()
            .includes(filters.global.value.toLowerCase())
      )
    );
  }

  return filteredData;
};
export default function VehiclesGrid({ data }) {
  const [visible, setVisible] = useState(false);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const totalItems = filteredData.length;
  const [myData, setMyData] = useState();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    device_type: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const getSeverity = (data) => {
    switch (data.status) {
      case "1":
        return "success";
      case "0":
        return "danger";
      default:
        return null;
    }
  };

  useEffect(() => {
    setAllData(data);
    const filteredData = applyFilters(filters, data);
    setFilteredData(filteredData);
  }, [data, filters]);
  //global search
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    const updatedFilters = {
      ...filters,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    };
    const filteredData = applyFilters(updatedFilters, allData);
    setFilters(updatedFilters);
    setFilteredData(filteredData);
  };
  const openDialog = (item) => {
    setMyData(item);
    setVisible(true);
  };
  const clearSearch = () => {
    setGlobalFilterValue("");
    const updatedFilters = {
      ...filters,
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
    const filteredData = applyFilters(updatedFilters, allData);
    setFilters(updatedFilters);
    setFilteredData(filteredData);
  };

  //card
  const itemTemplate = (item) => {
    return (
      <div className="p-col-12 vehicle-card mb-6 rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-150">
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-end">
              <div>
                <Tag
                  value={
                    parseInt(item.status) === 1
                      ? "Active"
                      : parseInt(item.status) === 0
                      ? "Deactive"
                      : undefined
                  }
                  severity={getSeverity(item)}
                ></Tag>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <div className="mt-4 flex justify-between font-semibold">
                  <div className="mr-auto">
                    <span>Vehicle Name</span>
                  </div>
                  <div>
                    <span className="px-2 font-normal">
                      {item.vehicle_name}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold ">
                  <div className="mr-auto">
                    <span>Registration No.</span>
                  </div>
                  <div className=" text-end">
                    <span className="px-2 font-normal">
                      {item.vehicle_registration}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold ">
                  <div className="mr-auto">
                    <span>DMS</span>
                  </div>
                  <div>
                    <span className="px-2 font-normal">{item.dms}</span>
                  </div>
                </div>
                <div className="text-bold flex justify-between font-semibold ">
                  <div className="mr-auto">
                    <span>IoT</span>
                  </div>
                  <div>
                    <span className="px-2 font-normal">{item.iot}</span>
                  </div>
                </div>
                <div className="text-bold flex justify-between font-semibold ">
                  <div className="mr-auto">
                    <span>ECU</span>
                  </div>
                  <div>
                    <span className="px-2 font-normal">{item.ecu}</span>
                  </div>
                </div>
              </div>
              <div>
                <GiMineTruck
                  className="text-red-450 dark:text-red-550"
                  style={{
                    fontSize: "4rem",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card-actions">
            <div>
              <Button
                icon="pi pi-eye"
                rounded
                outlined
                className="text-red-500 dark:text-blue-500"
                style={{ width: "2rem", height: "2rem" }}
                onClick={() => openDialog(item)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  //searchbox
  return (
    <div>
      <div className="my-4 mr-7  flex justify-end">
        <div className="justify-content-between align-items-center flex flex-wrap gap-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
              className="searchbox w-[25vw] cursor-pointer rounded-full dark:bg-gray-950 dark:text-gray-50"
            />
            {globalFilterValue && (
              <Button
                icon="pi pi-times"
                className="p-button-rounded p-button-text"
                onClick={clearSearch}
              />
            )}
          </span>
        </div>
      </div>
      {/* Grid View */}
      <DataView
        value={filteredData}
        layout="grid"
        itemTemplate={itemTemplate}
        paginator
        rows={6}
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        emptyMessage="No vehicles found."
      />
      <p className="text-center text-gray-700">Total Items : {totalItems}</p>

      <Dialog
        header="Vehicle Details"
        visible={visible}
        style={{ width: "70vw" }}
        onHide={() => setVisible(false)}
      >
        <TabView>
          {/* Vehicle Trips dialog */}
          <TabPanel header="Vehicle's Trips" leftIcon="pi pi-truck mr-2">
            <VehicleTrips />
          </TabPanel>
          {/* Feature Set dialog */}
          <TabPanel header="Feature Set" leftIcon="pi pi-cog mr-2">
            <FeatureSet parameters={{ propValue: myData?._id }} />
          </TabPanel>
        </TabView>
      </Dialog>
    </div>
  );
}
