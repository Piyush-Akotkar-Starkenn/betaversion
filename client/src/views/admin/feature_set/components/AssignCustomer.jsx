import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useRef } from "react";
import { Toast } from "primereact/toast";

const AssignCustomer = ({ parameters, onSuccess }) => {
  const [data, setData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const toastErr = useRef(null);
  const [validationError, setValidationError] = useState(false);

  //fetching customers to assign
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/featureset/featureset-not-assign-customerlist/${parameters.propValue}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [parameters.propValue]);
  const customerOptions = data.map((customer) => ({
    label: `${customer.first_name} ${customer.last_name}`,
    value: customer.userId,
  }));

  //update and assign FS to customer
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer) {
      setValidationError(true);
      return;
    }
    const requestData = {
      selectCustomer: [selectedCustomer],
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/featureset/featureset-assign-customer/${parameters.propValue}`,
        requestData
      )
      .then((res) => {
        console.log(res);
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        console.error(err);
        toastErr.current.show({
          severity: "danger",
          summary: "Error",
          detail: err.response.data.message || "An error occurred",
          life: 3000,
        });
      });
  };

  return (
    <>
      <Toast ref={toastErr} className="bg-red-400" />
      <div className="field my-3 w-[30vw]">
        <form onSubmit={handleSubmit}>
          <span className="p-float-label mt-8">
            <Dropdown
              value={selectedCustomer}
              options={customerOptions}
              onChange={(e) => setSelectedCustomer(e.value)}
              className={`rounded-lg border border-gray-300 bg-gray-50 py-0 shadow-sm dark:bg-gray-900 dark:placeholder-gray-50 ${
                validationError ? "p-invalid" : ""
              }`}
              optionLabel="label"
            />
            <label htmlFor="dd-city">Select a customer</label>
          </span>
          {validationError && (
            <div className="text-red-600">Please select a customer.</div>
          )}
          <div className="mt-4 text-right">
            <Button
              label="Assign"
              icon="pi pi-check"
              type="submit"
              className="px-3 py-2 text-right hover:bg-none dark:hover:bg-gray-50"
              style={{ width: "fit-content", background: "#2152FF" }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AssignCustomer;
