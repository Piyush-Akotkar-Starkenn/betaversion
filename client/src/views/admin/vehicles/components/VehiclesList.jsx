import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { FilterMatchMode } from "primereact/api";
import { TabView, TabPanel } from "primereact/tabview";
import FeatureSet from "./FeatureSet";
import VehicleTrips from "./VehicleTrips";

export default function VehiclesList({ data }) {
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [myData, setMyData] = useState();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  //global search
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
  //opens vehicle details dialog
  const openDialog = (rowData) => {
    setMyData(rowData);
    setVisible(true);
  };
  //closes vehicle details dialog
  const closeDialog = () => {
    setVisible(false);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          className="text-red-500 dark:text-blue-500"
          style={{ width: "2rem", height: "2rem" }}
          onClick={() => openDialog(rowData)}
        />
      </React.Fragment>
    );
  };

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

  const header = (
    <div className="align-items-center flex flex-wrap justify-end gap-2 py-3 dark:bg-gray-950">
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

  return (
    <div>
      <Toast ref={toast} />
      <div className="card mt-4 rounded-lg bg-none dark:bg-gray-950">
        <DataTable
          removableSort
          value={data}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
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
          <Column
            body={actionBodyTemplate}
            header="Action"
            exportable={false}
            className="border-none dark:bg-gray-900"
            style={{ minWidth: "6rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={visible}
        onHide={closeDialog}
        header="Vehicle Details"
        style={{ width: "70vw" }}
      >
        <TabView>
          <TabPanel header="Vehicle's Trips" leftIcon="pi pi-truck mr-2">
            <VehicleTrips />
          </TabPanel>
          <TabPanel header="Feature Set" leftIcon="pi pi-cog mr-2">
            <FeatureSet parameters={{ propValue: myData?._id }} />
          </TabPanel>
        </TabView>
      </Dialog>
    </div>
  );
}
