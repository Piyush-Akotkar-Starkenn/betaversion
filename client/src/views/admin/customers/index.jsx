import React, { useState, useEffect, useRef } from "react";
import CustomersList from "./components/CustomersList";
import { Toast } from "primereact/toast";
import CustomersGrid from "./components/CustomersGrid";
import { BsGrid, BsListUl } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import Cookies from "js-cookie";

const Customers = () => {
  const token = Cookies.get("token");
  const userUUID = Cookies.get("user_uuid");

  const [isListView, setIsListView] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState(null);
  const toastRef = useRef(null);
  const toastErr = useRef(null);
console.log("sapna");
  const [formErrors, setFormErrors] = useState({
    f_name: false,
    l_name: false,
    email: false,
    password: false,
    confirmPassword: false,
    user_type: false,
    phone: false,
    company_name: false,
    address: false,
    city: false,
    state: false,
    pincode: false,
  });

  const handleChange = (event) => {
    setUserType(event.value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      user_type: null,
    }));
  };

  //User Type options
  const options = [
    { label: "Customer", value: 2 },
    { label: "Admin", value: 1 },
  ];

  // Fetching all data
  useEffect(() => {
    fetchCustomersData();
  }, []);

  const fetchCustomersData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/customers/get-all-customer`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        const formattedData = res.data.customerData.map((item, index) => ({
          ...item,
          serialNo: index + 1,
          full_name: item.first_name + " " + item.last_name,
          full_address: `${item.address || ""} ${item.city || ""} ${
            item.state || ""
          } ${item.pincode || ""}`,
          company_name: item.company_name,
          contact_no: item.phone,
        }));
        setData(formattedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete api call
  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/customers/delete-customer/${customerId}`,
        { userUUID: userUUID },
        { headers: { authorization: `bearer ${token}` } }
      );

      // Remove the deleted customer from the state
      setData((prevData) =>
        prevData.filter((customer) => customer.userId !== customerId)
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // edit api call
  const handleUpdateCustomer = async (customerId, updatedData) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/customers/update-customer/${customerId}`,
        { ...updatedData, userUUID: userUUID },
        { headers: { authorization: `bearer ${token}` } }
      );
      // Update the customer data in the state
      setData((prevData) =>
        prevData.map((customer) =>
          customer.userId === customerId
            ? { ...customer, ...updatedData }
            : customer
        )
      );
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleListView = () => {
    setIsListView(true);
  };

  const handleGridView = () => {
    setIsListView(false);
  };

  //open add customer dialog
  const openDialog = () => {
    setIsDialogVisible(true);
  };

  //close add customer dialog
  const closeDialog = () => {
    setIsDialogVisible(false);
    setFormErrors(false);
    setUserType(null);
  };

  // Add Customer api call
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const data = {
      first_name: formData.get("f_name"),
      last_name: formData.get("l_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company_name: formData.get("company_name"),
      address: formData.get("address"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      user_type: formData.get("user_type"),
      city: formData.get("city"),
      state: formData.get("state"),
      pincode: formData.get("pincode"),
      user_status: formData.get("user_status"),
    };

    const isValidPhoneNumber = (phoneNumber) => {
      // Regular expression to check for exactly 10 digits
      const phonePattern = /^\d{10}$/;
      return phonePattern.test(phoneNumber);
    };
    setFormErrors({
      f_name: data.first_name === "",
      l_name: data.last_name === "",
      email: data.email === "",
      phone: data.phone === "" || !isValidPhoneNumber(data.phone),
      company_name: data.company_name === "",
      user_type: data.user_type === "",
      password: data.password === "",
      confirmPassword:
        data.password !== data.confirmPassword || data.password === "",
      address: data.address === "",
      city: data.city === "",
      state: data.state === "",
      pincode: data.pincode === "",
    });

    const requiredFields = [
      "f_name",
      "l_name",
      "email",
      "password",
      "confirmPassword",
      "user_type",
      "phone",
      "company_name",
      "address",
      "city",
      "state",
      "pincode",
    ];

    const isAnyFieldEmpty = requiredFields.some(
      (fieldName) => data[fieldName] === ""
    );

    if (isAnyFieldEmpty) {
      toastRef.current.show({
        severity: "warn",
        summary: "Fill Required Fields",
        detail: "Please fill in all the required details.",
        life: 3000,
      });
      return;
    }
    // Validate the phone number
    if (!isValidPhoneNumber(data.phone)) {
      toastRef.current.show({
        severity: "warn",
        summary: "Invalid Phone Number",
        detail: "Please enter a 10-digit valid phone number.",
        life: 3000,
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      toastRef.current.show({
        severity: "warn",
        summary: "Password Mismatch",
        detail: "Password and Confirm Password do not match.",
        life: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        { ...data, userUUID },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const responseData = response.data;
        console.log("Data posted successfully:", responseData);
        setIsDialogVisible(false);
        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: `User ${
            data.first_name + " " + data.last_name
          } Added successfully`,
          life: 3000,
        });
        fetchCustomersData();
      } else {
        console.log(response.data.message);
        toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail: `${response.data.message}`,
          life: 3000,
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          console.log("Unauthorized: Please authenticate.");
          toastRef.current.show({
            severity: "warn",
            summary: "Unauthorized",
            detail: "Please authenticate.",
            life: 3000,
          });
        } else if (status === 400) {
          const { message } = data;
          toastRef.current.show({
            severity: "error",
            summary: "Validation Error",
            detail: message,
            life: 3000,
          });
        } else if (status === 402) {
          console.log("Passwords MisMatched.");
          toastRef.current.show({
            severity: "error",
            summary: "Password Mismatch",
            detail: "Passwords do not match.",
            life: 3000,
          });
        } else if (
          status === 409 &&
          data.message === "This Email Already Taken "
        ) {
          toastRef.current.show({
            severity: "error",
            summary: "Use another email ID",
            detail: "This email ID is already in use.",
            life: 3000,
          });
        } else if (
          status === 409 &&
          data.message === "This Phone Number Already Taken"
        ) {
          toastRef.current.show({
            severity: "error",
            summary: "Use different Phone Number",
            detail: "The phone number is already in use.",
            life: 3000,
          });
        } else {
          console.log("Error:", error.response.data.message);
          toastRef.current.show({
            severity: "error",
            summary: "Error",
            detail: `${error.response.data.message}`,
            life: 3000,
          });
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Toast ref={toastRef} className="toast-custom" position="top-right" />
      <Toast ref={toastErr} className="bg-red-400" />
      <div className="flex justify-between">
        <h4 className="text-dark text-xl font-bold dark:text-white">
          Customers
        </h4>

        <div>
          <button
            className={`${
              isListView === true
                ? "list-btn bg-gray-150 px-3 py-2 dark:bg-gray-700"
                : "list-btn bg-white px-3 py-2 dark:bg-gray-150"
            }`}
            onClick={handleListView}
          >
            <BsListUl />
          </button>
          <button
            className={`${
              isListView === false
                ? "grid-btn bg-gray-150 px-3 py-2 dark:bg-gray-700"
                : "grid-btn bg-white px-3 py-2 dark:bg-gray-150"
            }`}
            onClick={handleGridView}
          >
            <BsGrid />
          </button>
        </div>
      </div>
      <Button
        label="New Customer"
        icon="pi pi-plus"
        severity="primary"
        className="mt-2 h-10 px-3 py-0 text-left dark:hover:text-white"
        onClick={openDialog}
      />
      {!isListView && (
        <CustomersGrid
          data={data}
          onDelete={handleDeleteCustomer}
          onUpdate={handleUpdateCustomer}
        />
      )}
      {isListView && (
        <div className="opacity-100 transition-opacity duration-500">
          <CustomersList
            data={data}
            onDelete={handleDeleteCustomer}
            onUpdate={handleUpdateCustomer}
          />
        </div>
      )}

      {/* Add customer form */}
      <Dialog
        visible={isDialogVisible}
        onHide={closeDialog}
        style={{ width: "45rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Fill the details"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="flex justify-evenly">
            <div className="card justify-content-center mr-1 mt-5 flex-auto">
              <span className="p-float-label">
                <InputText
                  id="f_name"
                  name="f_name"
                  className={
                    formErrors.f_name
                      ? "p-invalid"
                      : (data.f_name = "" ? "p-filled" : "")
                  }
                  floatingLabel
                />
                <label htmlFor="f_name">First Name</label>
              </span>
            </div>
            <div className="card justify-content-center ml-1 mt-5 flex-auto">
              <span className="p-float-label">
                <InputText
                  id="l_name"
                  name="l_name"
                  className={
                    formErrors.l_name
                      ? "p-invalid"
                      : (data.l_name = "" ? "p-filled" : "")
                  }
                  floatingLabel
                />
                <label htmlFor="l_name">Last Name</label>
              </span>
            </div>
          </div>
          <div className="mx-auto mt-8 w-[51vw]">
            <span className="p-float-label">
              <InputText
                id="email"
                type="email"
                name="email"
                className={
                  formErrors.email
                    ? "p-invalid"
                    : (data.email = "" ? "p-filled" : "")
                }
                floatingLabel
              />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[51vw]">
            <span className="p-float-label">
              <InputText
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                className={
                  formErrors.password
                    ? "p-invalid"
                    : data.password !== ""
                    ? ""
                    : "p-filled"
                }
                floatingLabel
              />
              <label htmlFor="password">Password</label>
              <div className="absolute right-2.5 top-4">
                {showPassword ? (
                  <FaEyeSlash
                    className="h-5 w-5 cursor-pointer text-gray-500"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="h-5 w-5 cursor-pointer text-gray-600"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[51vw]">
            <span className="p-float-label">
              <InputText
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className={
                  formErrors.confirmPassword
                    ? "p-filled p-invalid"
                    : (data.confirmPassword = "" ? "p-invalid p-filled" : "")
                }
                floatingLabel
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[51vw]">
            <span
              className={`p-float-label ${
                formErrors.user_type ? "p-invalid" : ""
              }`}
            >
              <Dropdown
                id="user_type"
                name="user_type"
                options={options}
                value={userType}
                optionLabel="label"
                optionValue="value"
                onChange={handleChange}
                className={formErrors.user_type ? "p-invalid" : ""}
              />
              <label htmlFor="user_type">User Type</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[51vw]">
            <span className="p-float-label">
              <InputText
                id="company_name"
                type="text"
                name="company_name"
                className={
                  formErrors.company_name
                    ? "p-invalid"
                    : (data.company_name = "" ? "p-filled" : "")
                }
                floatingLabel
              />
              <label htmlFor="company_name">Company Name</label>
            </span>
          </div>
          <div className="mx-auto mb-3 mt-8 w-[51vw]">
            <span className="p-float-label">
              <InputText
                id="phone"
                type="tel"
                name="phone"
                className={
                  formErrors.phone
                    ? "p-invalid"
                    : (data.phone = "" ? "p-filled" : "")
                }
                floatingLabel
              />
              <label htmlFor="phone">Contact Number</label>
            </span>
          </div>
          <div className="mx-auto mt-6 w-[51vw]">
            <span>Address:</span>
          </div>
          <div className="mx-auto mt-2 w-[51vw]">
            <span className="p-float-label">
              <InputText
                id="address"
                type="text"
                name="address"
                className={
                  formErrors.address
                    ? "p-invalid"
                    : (data.address = "" ? "p-filled" : "")
                }
                floatingLabel
              />
              <label htmlFor="address">Flat No./ Plot No., Area/Society</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[51vw]">
            <span className="p-float-label">
              <InputText
                id="city"
                type="text"
                name="city"
                className={
                  formErrors.city
                    ? "p-invalid"
                    : (data.city = "" ? "p-filled" : "")
                }
                floatingLabel
              />
              <label htmlFor="city">City</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[51vw]">
            <span className="p-float-label">
              <InputText
                id="state"
                type="text"
                name="state"
                className={
                  formErrors.state
                    ? "p-invalid"
                    : (data.state = "" ? "p-filled" : "")
                }
                floatingLabel
              />
              <label htmlFor="state">State</label>
            </span>
          </div>
          <div className="mx-auto mt-8 w-[51vw]">
            <span className="p-float-label">
              <InputText
                id="pincode"
                type="text"
                name="pincode"
                keyfilter="pint"
                className={
                  formErrors.pincode
                    ? "p-invalid"
                    : (data.pincode = "" ? "p-filled" : "")
                }
                floatingLabel
                onChange={(e) => {
                  const value = e.target.value;
                  const formattedValue = value.replace(/\D/g, "").slice(0, 6); // Remove non-digits and limit to 6 characters
                  e.target.value = formattedValue;
                }}
              />
              <label htmlFor="pincode">Pincode (Format: xxxxxx)</label>
            </span>
          </div>

          <div className="my-4">
            <input
              type="radio"
              className="inlinemx-2 mx-2"
              name="user_status"
              id="userActive"
              value={1}
            />
            <label htmlFor="userActive">Active</label>
            <input
              type="radio"
              className="mx-2 inline"
              name="user_status"
              id="userDeactive"
              value={2}
            />
            <label htmlFor="userDeactive">Deactive</label>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Add Customer
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Customers;
