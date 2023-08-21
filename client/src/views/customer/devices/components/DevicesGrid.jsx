import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FilterMatchMode } from "primereact/api";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { MdOnDeviceTraining } from "react-icons/md";
import { Toast } from "primereact/toast";

const applyFilters = (filters, allData) => {
  let filteredData = allData;

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
export default function DevicesGrid({ data, onDeleteDevice, onEditDevice }) {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    device_type: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [editedDevice, setEditedDevice] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  // const [editData, setEditData] = useState({});
  const [listCustomers, setListCustomers] = useState([]);
  const totalItems = filteredData.length;
  const devicesOptions = [
    { label: "ECU", value: "ECU" },
    { label: "IoT", value: "IoT" },
    { label: "DMS", value: "DMS" },
  ];

  const stateOptions = [
    { label: "Active", value: "true" },
    { label: "Deactive", value: "false" },
  ];
  const toastRef = useRef(null);

  useEffect(() => {
    setAllData(data);
    const filteredData = applyFilters(filters, data);
    setFilteredData(filteredData);
  }, [data, filters]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/Admin/Devices/get-customers`)
      .then((res) => {
        setListCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Customersoptions = () => {
    return listCustomers?.map((el) => ({
      label: el.first_name + " " + el.last_name,
      value: el.userId,
    }));
  };

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

  const handleEdit = (device) => {
    setEditedDevice(device);
    setIsEditDialogVisible(true);
  };

  const handleDelete = (device) => {
    setSelectedDevice(device);
    setIsDeleteDialogVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await onDeleteDevice(selectedDevice.device_id);

      const updatedData = allData.filter(
        (device) => device.device_id !== selectedDevice.device_id
      );

      setAllData(updatedData);
      const filteredData = applyFilters(filters, updatedData);
      setFilteredData(filteredData);
      setSelectedDevice(null);
      setIsDeleteDialogVisible(false);
      toastRef.current.show({
        severity: "success",
        summary: "Device Deleted",
        detail: "Customer has been deleted successfully.",
      });
    } catch (error) {
      console.error("Delete error:", error);
      setIsDeleteDialogVisible(false);
      toastRef.current.show({
        severity: "danger",
        summary: "Error",
        detail: "Error while deleting",
        life: 3000,
      });
    }
  };

  const itemTemplate = (item) => {
    return (
      <div className="p-col-11 mb-6 rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-150">
        <div className="card">
          <div className="card-body px-6 py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="mt-4 flex justify-between font-semibold">
                  <div className="mr-16">
                    <span>Device ID</span>
                  </div>
                  <div>
                    <span>{item.device_id}</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold ">
                  <div className="mr-16">
                    <span>Device Type</span>
                  </div>
                  <div>
                    <span>{item.device_type}</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold ">
                  <div className="mr-16">
                    <span>Customer ID</span>
                  </div>
                  <div>
                    <span>{item.customer_id}</span>
                  </div>
                </div>
                <div className="text-bold flex justify-between font-semibold ">
                  <div className="mr-16">
                    <span>Sim Number</span>
                  </div>
                  <div>
                    <span>{item.sim_number}</span>
                  </div>
                </div>
              </div>
              <div>
                <MdOnDeviceTraining className="text-6xl text-gray-500" />
              </div>
            </div>
            <div className="mt-4 flex justify-end rounded">
              <div>
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-text mr-2"
                  style={{
                    borderColor: "#6E70F2",
                    width: "2.2rem",
                    height: "2.2rem",
                  }}
                  onClick={() => handleEdit(item)}
                />
                <Button
                  icon="pi pi-trash"
                  rounded
                  outlined
                  style={{
                    borderColor: "#F18080",
                    width: "2.2rem",
                    height: "2.2rem",
                  }}
                  className="p-button-rounded p-button-text p-button-danger"
                  onClick={() => handleDelete(item)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Delete Dialog

  // Edit Dialog

  const EditDeviceDialog = ({ visible, onHide, device }) => {
    const [editedDeviceData, setEditedDeviceData] = useState(device);

    const onSave = async () => {
      try {
        await onEditDevice(device.device_id, editedDeviceData);

        const updatedData = allData.map((item) =>
          item.device_id === device.device_id
            ? { ...item, ...editedDeviceData }
            : item
        );

        setAllData(updatedData);
        const filteredData = applyFilters(filters, updatedData);
        setFilteredData(filteredData);
        setEditedDevice(null);
        setIsEditDialogVisible(false);
        toastRef.current.show({
          severity: "success",
          summary: "Customer Updated",
          detail: "Customer information has been updated successfully.",
        });
      } catch (error) {
        console.error("Save error:", error);
        toastRef.current.show({
          severity: "danger",
          summary: "Error",
          detail: "Error while saving",
          life: 3000,
        });
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedDeviceData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    return (
      <Dialog
        visible={visible}
        onHide={onHide}
        style={{ width: "45rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit the Device"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <div className="mx-auto mt-8 w-[34.5vw]">
          <span className="p-float-label">
            <InputText
              id="device_id"
              name="device_id"
              onChange={handleInputChange}
              value={editedDeviceData?.device_id || ""}
            />
            <label htmlFor="device_id">DeviceId</label>
          </span>
        </div>
        <div className="mx-auto mt-8 w-[34.5vw]">
          <span className="p-float-label">
            <Dropdown
              id="device_type"
              name="device_type"
              options={devicesOptions}
              optionLabel="label"
              optionValue="value"
              value={editedDeviceData?.device_type || ""}
              placeholder={selectedDevice?.device_type}
              className="p-dropdown"
              onChange={handleInputChange}
            />
            <label htmlFor="device_type">Device_type</label>
          </span>
        </div>

        <div className="mx-auto mt-8 w-[34.5vw]">
          <span className="p-float-label">
            <Dropdown
              id="customer_id"
              name="customer_id"
              options={Customersoptions()}
              optionLabel="label"
              optionValue="value"
              className="p-dropdown"
              value={editedDeviceData?.customer_id || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="customer_id">Customer List</label>
          </span>
        </div>
        <div className="mx-auto mt-8 w-[34.5vw]">
          <span className="p-float-label">
            <Dropdown
              id="status"
              name="status"
              options={stateOptions}
              optionLabel="label"
              optionValue="value"
              className="p-dropdown"
              value={editedDeviceData?.status || ""}
              placeholder={selectedDevice?.status}
              onChange={handleInputChange}
            />
            <label htmlFor="status">Status</label>
          </span>
        </div>
        <div className="mx-auto mt-8 w-[34.5vw]">
          <span className="p-float-label">
            <InputText
              id="sim_number"
              name="sim_number"
              keyfilter="pint"
              value={editedDeviceData?.sim_number || ""}
              placeholder={selectedDevice?.sim_number}
              onChange={handleInputChange}
            />
            <label htmlFor="sim_number">Sim Number</label>
          </span>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            onClick={onSave}
          >
            Edit Device
          </button>
        </div>
      </Dialog>
    );
  };

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
      <Toast ref={toastRef} className="toast-custom" position="top-right" />
      <DataView
        value={filteredData}
        layout="grid"
        itemTemplate={itemTemplate}
        paginator
        rows={6}
        emptyMessage="No devices found."
      />
      <p className="text-center text-gray-700">Total Items : {totalItems}</p>
      {/* Add the delete dialog component */}
      <Dialog
        visible={isDeleteDialogVisible}
        onHide={() => setIsDeleteDialogVisible(false)}
        header="Confirm Delete"
        footer={
          <div>
            <Button
              label="Delete"
              icon="pi pi-times"
              className="p-button-danger"
              onClick={confirmDelete}
            />
            <Button
              label="Cancel"
              icon="pi pi-check"
              className="p-button-secondary"
              onClick={() => setIsDeleteDialogVisible(false)}
            />
          </div>
        }
      >
        <div>Are you sure you want to delete ${selectedDevice?.device_id}?</div>
      </Dialog>
      {/* Add the edit dialog component */}
      <EditDeviceDialog
        visible={isEditDialogVisible}
        onHide={() => setIsEditDialogVisible(false)}
        device={editedDevice}
      />
    </div>
  );
}
