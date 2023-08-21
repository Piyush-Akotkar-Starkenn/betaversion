import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";

const Schedule = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(" ");
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [vehicleParams, setVehicleParams] = useState([]);
  const [driverParams, setDriverParams] = useState([]);
  const [recipient, setRecipient] = useState([]);
  const repeat_types = [
    { name: "Weekly", key: "A" },
    { name: "Monthly", key: "B" },
    { name: "Yearly", key: "C" },
  ];
  const [repeatTypes, setRepeatTypes] = useState(repeat_types[0]);

  const vehicles = [
    { name: "Vehicle 1", id: 1 },
    { name: "Vehicle 2", id: 2 },
    // Add more vehicles as needed
  ];
  const vehicleparams = [
    { name: "Vehicle 1", id: 1 },
    { name: "Vehicle 2", id: 2 },
    // Add more vehicles as needed
  ];

  const drivers = [
    { name: "Driver 1", id: 1 },
    { name: "Driver 2", id: 2 },
    // Add more drivers as needed
  ];

  const driverparams = [
    { name: "Score", id: 1 },
    // Add more vehicles as needed
  ];

  return (
    <div>
      <p className="text-right text-sm text-red-400">
        All Fields Are Required<span className="text-red-500">**</span>
      </p>
      <form>
        <div className="mb-6">
          <div className="card p-fluid mt-6 flex flex-wrap gap-3">
            <div className="flex-auto">
              <span className="p-float-label">
                <Calendar
                  inputId="start_date"
                  value={selectedStartDate}
                  onChange={(e) => setSelectedStartDate(e.value)}
                />
                <label
                  htmlFor="start_date"
                  className="text-gray-150 dark:text-gray-150"
                >
                  From
                </label>
              </span>

              <small className="text-gray-400 dark:text-gray-150">
                Click to Select
              </small>
            </div>
            <div className="flex-auto">
              <span className="p-float-label">
                <Calendar
                  inputId="end_date"
                  value={selectedEndDate}
                  onChange={(e) => setSelectedEndDate(e.value)}
                />
                <label
                  htmlFor="start_date"
                  className="text-gray-150 dark:text-gray-150"
                >
                  To
                </label>
              </span>

              <small className="text-gray-400 dark:text-gray-150">
                Click to Select
              </small>
            </div>
            <div className="flex-auto">
              <div className="mt-2 flex flex-wrap gap-5">
                <p className="text-gray-600">You want to generate report for</p>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="vehicle"
                    name="vehicle"
                    value="Vehicle"
                    onChange={() => setSelectedOption("Vehicle")}
                    checked={selectedOption === "Vehicle"}
                  />
                  <label htmlFor="vehicle" className="ml-2">
                    Vehicle
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="driver"
                    name="driver"
                    value="Driver"
                    onChange={() => setSelectedOption("Driver")}
                    checked={selectedOption === "Driver"}
                  />
                  <label htmlFor="driver" className="ml-2">
                    Driver
                  </label>
                </div>
              </div>
            </div>
            {selectedOption === "Vehicle" && (
              <div className="mt-3 w-[42vw]">
                <span className="p-float-label">
                  <MultiSelect
                    value={selectedVehicles}
                    options={vehicles}
                    onChange={(e) => setSelectedVehicles(e.value)}
                    optionLabel="name"
                    optionValue="id"
                    className="rounded-lg border border-gray-300 bg-gray-50 py-0 shadow-sm dark:bg-gray-900 dark:placeholder-gray-50"
                  />
                  <label
                    htmlFor="vehicle"
                    className="text-gray-150 dark:text-gray-150"
                  >
                    Select Vehicles
                  </label>
                </span>
                <span className="p-float-label mt-8">
                  <MultiSelect
                    value={vehicleParams}
                    options={vehicleparams}
                    onChange={(e) => setVehicleParams(e.value)}
                    optionLabel="name"
                    optionValue="id"
                    className="rounded-lg border border-gray-300 bg-gray-50 py-0 shadow-sm dark:bg-gray-900 dark:placeholder-gray-50"
                  />
                  <label
                    htmlFor="vehicle"
                    className="text-gray-150 dark:text-gray-150"
                  >
                    Select Parameters
                  </label>
                </span>
              </div>
            )}
            {selectedOption === "Driver" && (
              <div className="mt-3 w-[42vw]">
                <span className="p-float-label">
                  <MultiSelect
                    value={selectedDrivers}
                    options={drivers}
                    onChange={(e) => setSelectedDrivers(e.value)}
                    optionLabel="name"
                    optionValue="id"
                    className="rounded-lg border border-gray-300 bg-gray-50 py-0 shadow-sm dark:bg-gray-900 dark:placeholder-gray-50"
                  />
                  <label
                    htmlFor="vehicle"
                    className="text-gray-150 dark:text-gray-150"
                  >
                    Select Drivers
                  </label>
                </span>
                <span className="p-float-label mt-8">
                  <MultiSelect
                    value={driverParams}
                    options={driverparams}
                    onChange={(e) => setDriverParams(e.value)}
                    optionLabel="name"
                    optionValue="id"
                    className="rounded-lg border border-gray-300 bg-gray-50 py-0 shadow-sm dark:bg-gray-900 dark:placeholder-gray-50"
                  />
                  <label
                    htmlFor="vehicle"
                    className="text-gray-150 dark:text-gray-150"
                  >
                    Select Parameters
                  </label>
                </span>
              </div>
            )}
            <div className="mt-3 w-[42vw]">
              <p className="text-gray-600">Select Recipient</p>
              <span className="p-float-label mt-6">
                <InputText name="name" />
                <label
                  htmlFor="name"
                  className="text-gray-150 dark:text-gray-150"
                >
                  Name of Recipient
                </label>
              </span>
            </div>
            <div className="align-items-center mt-4 flex">
              <RadioButton
                inputId="mobile"
                name="mobile"
                value="Mobile"
                onChange={() => setRecipient("Mobile")}
                checked={recipient === "Mobile"}
              />
              <label htmlFor="ingredient1" className="ml-2">
                Mobile
              </label>
            </div>
            {recipient === "Mobile" && (
              <div className="mt-1">
                <InputText name="name" placeholder="Enter mobile no." />
              </div>
            )}
            <div className="align-items-center mt-4 flex">
              <RadioButton
                inputId="email"
                name="email"
                value="Email"
                onChange={() => setRecipient("Email")}
                checked={recipient === "Email"}
              />
              <label htmlFor="ingredient2" className="ml-2">
                Email
              </label>
            </div>
            {recipient === "Email" && (
              <div className="mt-1">
                <InputText
                  name="name"
                  keyfilter="email"
                  placeholder="Enter email ID"
                />
              </div>
            )}
          </div>
          <p className="my-3 text-gray-600">Repeat Type</p>
          <div className="flex flex-col gap-3">
            {repeat_types.map((repeat_type) => {
              return (
                <div key={repeat_type.key} className="align-items-center flex">
                  <RadioButton
                    inputId={repeat_type.key}
                    name="repeat_type"
                    value={repeat_type}
                    onChange={(e) => setRepeatTypes(e.value)}
                    checked={repeatTypes.key === repeat_type.key}
                  />
                  <label htmlFor={repeat_type.key} className="ml-2">
                    {repeat_type.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-4 py-1.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default Schedule;
