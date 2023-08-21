import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { CiMenuKebab } from "react-icons/ci";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const applyFilters = (filters, allData) => {
  let filteredData = allData;
  //condition to exclude these fields for global search
  if (filters.global.value) {
    filteredData = filteredData.filter((item) =>
      Object.entries(item).some(
        ([key, value]) =>
          key !== "label" &&
          key !== "password" &&
          key !== "accessToken" &&
          key !== "confirmPassword" &&
          key !== "created_at" &&
          key !== "updated_at" &&
          key !== "userId" &&
          key !== "user_type" &&
          key !== "_id" &&
          String(value)
            .toLowerCase()
            .includes(filters.global.value.toLowerCase())
      )
    );
  }

  return filteredData;
};

export default function CustomersGrid({ data, onDelete, onUpdate }) {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    device_type: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const menuLeft = useRef(null);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const totalItems = filteredData.length;
  const toastRef = useRef(null);
  const toastErr = useRef(null);

  //Global Search
  useEffect(() => {
    setAllData(data);
    const filteredData = applyFilters(filters, data);
    setFilteredData(filteredData);
  }, [data, filters]);

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

  //delete api call
  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await onDelete(selectedCustomer.userId);

      const updatedData = allData.filter(
        (customer) => customer.userId !== selectedCustomer.userId
      );

      setAllData(updatedData);
      const filteredData = applyFilters(filters, updatedData);
      setFilteredData(filteredData);
      setSelectedCustomer(null);
      setIsDeleteDialogVisible(false);
      toastRef.current.show({
        severity: "success",
        summary: "Customer Deleted",
        detail: "Customer has been deleted successfully.",
      });
    } catch (error) {
      console.error("Delete error:", error);
      setIsDeleteDialogVisible(false);
      toastErr.current.show({
        severity: "danger",
        summary: "Error",
        detail: "Error while deleting",
        life: 3000,
      });
    }
  };

  //card
  const itemTemplate = (item) => {
    return (
      <div className="p-col-11 w-95 mb-6 rounded bg-gray-50 dark:bg-gray-900 dark:text-gray-150">
        <div className="card flex h-full flex-col">
          <div className="card-body px-6 py-3">
            <div className="mt-4 flex justify-between font-normal">
              <div className="mr-16 flex-shrink-0">
                <span>Full Name</span>
              </div>
              <div>
                <span>{item.full_name}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between font-normal">
              <div className="mr-16 flex-shrink-0">
                <span>Email</span>
              </div>
              <div>
                <span>{item.email}</span>
              </div>
            </div>
            <div className="flex justify-between font-normal">
              <div className="mr-16 flex-shrink-0">
                <span>Address</span>
              </div>
              <div className="text-end">
                <span>{item.full_address}</span>
              </div>
            </div>
            <div className="flex justify-between font-normal">
              <div className="mr-16 flex-shrink-0">
                <span>Company Name</span>
              </div>
              <div>
                <span>{item.company_name}</span>
              </div>
            </div>
            <div className="text-bold flex justify-between font-normal">
              <div className="mr-16 flex-shrink-0">
                <span>Contact No.</span>
              </div>
              <div>
                <span>{item.phone}</span>
              </div>
            </div>
          </div>
          <div className="mt-auto px-6 py-3">
            <Button
              icon="pi pi-pencil"
              className="edit mr-2 rounded-full dark:text-gray-100"
              style={{
                background: "none",
                width: "2rem",
                height: "2rem",
              }}
              onClick={() => handleEdit(item)}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              style={{
                borderColor: "#F18080",
                width: "2rem",
                height: "2rem",
              }}
              className="p-button-rounded p-button-text p-button-danger"
              onClick={() => handleDelete(item)}
            />
            <Button
              type="button"
              className="text-bold setting ml-2 rounded-full text-gray-950 dark:text-white"
              onClick={(event) => menuLeft.current.toggle(event)}
              style={{ padding: "0.4rem" }}
              aria-controls="popup_menu_left"
              aria-haspopup
            >
              <CiMenuKebab />
            </Button>
            <Menu
              model={[
                {
                  label: "Rights Management",
                  icon: "pi pi-lock",
                },
                {
                  label: "Manage Assigned",
                  icon: "pi pi-users",
                },
                {
                  label: "Manage Unassigned",
                  icon: "pi pi-user-minus",
                },
              ]}
              popup
              ref={menuLeft}
              id="popup_menu_left"
              popupAlignment="left"
            />
          </div>
        </div>
      </div>
    );
  };

  //edit api call
  const handleEdit = (customer) => {
    setEditedCustomer(customer);
    setIsEditDialogVisible(true);
  };

  const EditCustomerDialog = ({ visible, onHide, customer }) => {
    const [editedCustomerData, setEditedCustomerData] = useState(
      customer || {}
    );
    const isValidPhoneNumber = (phoneNumber) => {
      // Regular expression to check for exactly 10 digits
      const phonePattern = /^\d{10}$/;
      return phonePattern.test(phoneNumber);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;

      setEditedCustomerData((prevState) => {
        const updatedData = { ...prevState, [name]: value };

        if (name === "first_name") {
          updatedData.full_name = `${value} ${prevState.last_name || ""}`;
        } else if (name === "last_name") {
          updatedData.full_name = `${prevState.first_name || ""} ${value}`;
        }

        const { address, city, state, pincode } = updatedData;
        updatedData.full_address = `${address || ""}, ${city || ""}, ${
          state || ""
        }, ${pincode || ""}`;

        return updatedData;
      });
    };

    const onSave = async () => {
      if (!isValidPhoneNumber(editedCustomerData.phone)) {
        toastRef.current.show({
          severity: "warn",
          summary: "Invalid Phone Number",
          detail: "Please enter a 10-digit valid phone number.",
          life: 3000,
        });
        return;
      }
      if (
        editedCustomerData.first_name === "" ||
        editedCustomerData.last_name === "" ||
        editedCustomerData.email === "" ||
        editedCustomerData.company_name === "" ||
        editedCustomerData.address === "" ||
        editedCustomerData.city === "" ||
        editedCustomerData.state === "" ||
        editedCustomerData.pincode === "" ||
        editedCustomerData.phone === ""
      ) {
        toastRef.current.show({
          severity: "warn",
          summary: "Missing field",
          detail: "Field cannot be empty",
          life: 3000,
        });
        return;
      }

      try {
        await onUpdate(customer.userId, editedCustomerData);

        const updatedData = allData.map((item) =>
          item.userId === customer.userId
            ? { ...item, ...editedCustomerData }
            : item
        );

        setAllData(updatedData);
        const filteredData = applyFilters(filters, updatedData);
        setFilteredData(filteredData);
        setEditedCustomer(null);
        setIsEditDialogVisible(false);
        toastRef.current.show({
          severity: "success",
          summary: "Customer Updated",
          detail: `${
            editedCustomerData.first_name + " " + editedCustomerData.last_name
          }'s data has been updated successfully.`,
        });
      } catch (error) {
        console.error("Save error:", error);
        toastErr.current.show({
          severity: "danger",
          summary: "Error",
          detail: "Error while saving",
          life: 3000,
        });
      }
    };

    //edit customer dialog
    return (
      <Dialog
        visible={visible}
        onHide={onHide}
        header="Edit Customer"
        footer={
          <div>
            <Button
              label="Update"
              icon="pi pi-check"
              className="p-button-primary px-3 py-2 hover:bg-none dark:hover:bg-gray-50"
              onClick={onSave}
            />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="flex justify-between">
            <div className="card justify-content-center mr-1 mt-5 flex-auto">
              <span className="p-float-label">
                <InputText
                  id="first_name"
                  name="first_name"
                  value={editedCustomerData?.first_name || ""}
                  onChange={handleInputChange}
                  className={!editedCustomerData.first_name ? "p-invalid" : ""}
                />
                <label htmlFor="first_name">First Name</label>
              </span>
            </div>
            <div className="card justify-content-center ml-1 mt-5 flex-auto">
              <span className="p-float-label">
                <InputText
                  id="last_name"
                  name="last_name"
                  value={editedCustomerData?.last_name || ""}
                  onChange={handleInputChange}
                  className={!editedCustomerData.last_name ? "p-invalid" : ""}
                />
                <label htmlFor="last_name">Last Name</label>
              </span>
            </div>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="email"
                type="email"
                name="email"
                value={editedCustomerData?.email || ""}
                onChange={handleInputChange}
                className={!editedCustomerData.email ? "p-invalid" : ""}
              />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="company_name"
                type="text"
                name="company_name"
                value={editedCustomerData?.company_name || ""}
                onChange={handleInputChange}
                className={!editedCustomerData.company_name ? "p-invalid" : ""}
              />
              <label htmlFor="company_name">Company Name</label>
            </span>
          </div>
          <div className="mx-auto mb-3 mt-8 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="phone"
                type="tel"
                name="phone"
                value={editedCustomerData?.phone || ""}
                onChange={handleInputChange}
                className={
                  isValidPhoneNumber(editedCustomerData?.phone || "")
                    ? ""
                    : "p-invalid"
                }
              />
              <label htmlFor="phone">Contact Number</label>
            </span>
          </div>
          <div className="mx-auto mt-6 w-[34.5vw]">
            <span>Address:</span>
          </div>
          <div className="mx-auto mt-6 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="address"
                type="text"
                name="address"
                value={editedCustomerData?.address || ""}
                onChange={handleInputChange}
                className={!editedCustomerData.address ? "p-invalid" : ""}
              />
              <label htmlFor="address">Flat No./ Plot No., Area/Society</label>
            </span>
          </div>
          <div className="mx-auto mt-6 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="city"
                type="text"
                name="city"
                value={editedCustomerData?.city || ""}
                onChange={handleInputChange}
                className={!editedCustomerData.city ? "p-invalid" : ""}
              />
              <label htmlFor="city">City</label>
            </span>
          </div>
          <div className="mx-auto mt-6 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="state"
                type="text"
                name="state"
                value={editedCustomerData?.state || ""}
                onChange={handleInputChange}
                className={!editedCustomerData.state ? "p-invalid" : ""}
              />
              <label htmlFor="state">State</label>
            </span>
          </div>
          <div className="mx-auto mt-6 w-[34.5vw]">
            <span className="p-float-label">
              <InputText
                id="pincode"
                type="text"
                name="pincode"
                value={editedCustomerData?.pincode || ""}
                onChange={handleInputChange}
                className={!editedCustomerData.pincode ? "p-invalid" : ""}
              />
              <label htmlFor="pincode">Pincode</label>
            </span>
          </div>
        </div>
      </Dialog>
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
      <Toast ref={toastRef} className="toast-custom" position="top-right" />
      <Toast ref={toastErr} className="bg-red-400" />

      {/* Grid view of customers */}
      <DataView
        value={filteredData}
        itemTemplate={itemTemplate}
        layout="grid"
        paginator
        rows={6}
        emptyMessage="No customers found."
      />
      <p className="text-center text-gray-700">Total Items : {totalItems}</p>

      {/* delete dialog */}
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
        <div>Are you sure you want to delete this customer?</div>
      </Dialog>
      <EditCustomerDialog
        visible={isEditDialogVisible}
        onHide={() => setIsEditDialogVisible(false)}
        customer={editedCustomer}
      />
    </div>
  );
}
