import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import axios from "axios";

const VehicleTrips = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [data, setData] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/Vehicles/getAllVehicle`)
      .then((res) => {
        const formattedData = res.data.data.map((item, index) => ({
          ...item,
          serialNo: index + 1,
        }));
        setData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const clearSearch = () => {
    setGlobalFilterValue("");
    const _filters = { ...filters };
    _filters["global"].value = null;
    setFilters(_filters);
  };

  const header = (
    <div className="align-items-center flex flex-wrap justify-end gap-2 py-3">
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
  );
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

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        className="px-3"
        value={
          parseInt(rowData.status) === 1
            ? "Active"
            : parseInt(rowData.status) === 0
            ? "Deactive"
            : undefined
        }
        severity={getSeverity(rowData)}
      ></Tag>
    );
  };
  return (
    <>
      <DataTable
        removableSort
        value={data}
        dataKey="id"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        filterDisplay="menu"
        filters={filters}
        globalFilterFields={[
          "vehicle_name",
          "vehicle_registration",
          "dms",
          "iot",
          "ecu",
        ]}
        emptyMessage="No vehicles found."
        header={header}
      >
        <Column
          field="serialNo"
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "4rem", textAlign: "center" }}
        ></Column>
        <Column
          field="vehicle_name"
          header="Vehicle Name"
          sortable
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "10rem", border: "none !important" }}
        ></Column>

        <Column
          field="vehicle_registration"
          header="Registration No."
          sortable
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="dms"
          header="DMS"
          sortable
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "9rem" }}
        ></Column>
        <Column
          field="iot"
          header="IoT"
          sortable
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "9rem" }}
        ></Column>
        <Column
          field="ecu"
          header="ECU"
          sortable
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "9rem" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          sortable
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "7rem" }}
        ></Column>
      </DataTable>
    </>
  );
};

export default VehicleTrips;
