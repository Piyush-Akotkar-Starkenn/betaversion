import React, { useContext, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import axios from "axios";
import { AppContext } from "context/AppContext";
import { Toast } from "primereact/toast";

const AddFeatureSet = ({ onSuccess }) => {
  const [data, setData] = useState({
    detectStationaryObject: "",
    allowCompleteBrake: "",
    detectOncomingObstacle: "",
    safetyMode: "",
    protocolType: "",
    acceleratorType: "",
    brakeType: "",
    speedSource: "",
    braking: "",
    vehicleType: "",
  });
  const toastRef = useRef(null);
  const toastErr = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [listCustomers, setListCustomers] = useState([]);
  const { updateFunc } = useContext(AppContext);

  useEffect(() => {
    setData((prevData) => ({ ...prevData, selectCustomer: [...customers] }));
  }, [customers]);

  //fetching customers
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/featureset/featureset-get-all-customers`
      )
      .then((res) => {
        console.log(res);
        setListCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSelectCustomer = (e) => {
    const { value } = e.target;
    setSelectedCustomer(value);
    setCustomers([...customers, value]);
  };

  //add feature set api call
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(Object.keys(data).length);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/featureset/featureset-add`,
        data
      );
      toastRef.current.show({
        severity: "success",
        summary: "Success",
        detail: response.data.message || `Feature Set  added successfully`,
        life: 3000,
      });

      updateFunc();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      toastErr.current.show({
        severity: "error",
        summary: "Error",
        detail:
          err.response?.data?.error ||
          "An error occurred. Please try again later.",
        life: 3000,
      });

      console.error("Error:", err);
    }
  };

  //dropdown options
  const StationaryObjectoptions = [
    { label: "Yes", value: 0 },
    { label: "No", value: 1 },
  ];

  const CompleteBrakeoptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const OncomingObstacleptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const SafetyModeoptions = [
    { label: "Normal", value: "Normal" },
    { label: "Relaxed", value: "Relaxed" },
    {
      label: "Strict",
      value: "Strict",
    },
  ];

  const Brakingoptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const VehicleTypeoptions = [{ label: "12V Pedal", value: "12V Pedal" }];

  const AcceleratorTypeoptions = [
    {
      label: "Sensor",
      value: "Sensor",
    },
    {
      label: "Cylinder",
      value: "Cylinder",
    },
    {
      label: "Solenoid",
      value: "Solenoid",
    },
  ];

  const ProtocolTypeoptions = [
    { label: "SAEJ1939", value: "SAEJ1939" },
    {
      label: "CAN",
      value: "CAN",
    },
  ];

  const BrakeTypeoptions = [
    { label: "Cylinder", value: "Cylinder" },
    { label: "Internal Braking", value: "Internal Braking" },
    {
      label: "Electromagnetic",
      value: "Electromagnetic",
    },
  ];

  const SpeedSourceoptions = [
    { label: "Speed Wire", value: "Speed Wire" },
    { label: "OBD", value: "OBD" },
    { label: "GPS", value: "GPS" },
  ];

  const Customersoptions = () => {
    return listCustomers?.map((el) => ({
      label: el.first_name,
      value: el.userId,
    }));
  };

  //add FS dialog
  return (
    <>
      <Toast ref={toastRef} className="toast-custom" position="top-right" />
      <Toast ref={toastErr} />
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="flex" style={{ flexDirection: "column" }}>
            <label htmlFor="username">Feature Set ID*</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              le={{
                width: "63vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder="Feature Set ID"
              name="featureSetId"
              onChange={handleChange}
            />
            <small id="username-help">Unique id to identify feature set</small>
          </div>

          <div className="mt-2 flex" style={{ flexDirection: "column" }}>
            <label htmlFor="username">Feature Set Name*</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              le={{
                width: "63vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder="Feature Set Name"
              name="featureSetName"
              onChange={handleChange}
            />
            <small id="username-help">Unique id to identify feature set</small>
          </div>

          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Select Customer</label>
            <Dropdown
              name="selectCustomer"
              onChange={handleSelectCustomer}
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              options={Customersoptions()}
              optionLabel="label"
              optionValue="value"
              placeholder="Tap to Select"
              className="md:w-14rem mt-2 w-full"
              value={selectedCustomer}
            />
          </div>
          <p className="mt-4 font-bold ">System Type</p>
          <div className="my-3 flex flex-wrap gap-3">
            <div className="align-items-center flex">
              <input
                type="radio"
                name="mode"
                onChange={handleChange}
                value="Offline"
              />
              <label htmlFor="ingredient1" className="ml-2">
                Offline Mode
              </label>
            </div>
            <div className="align-items-center flex">
              <input
                type="radio"
                name="mode"
                onChange={handleChange}
                value="Online"
              />
              <label htmlFor="ingredient2" className="ml-2">
                Online Mode
              </label>
            </div>
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Collision Avoidance System</p>
        <div className="card justify-content-center mt-5 flex gap-4">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="CASMode"
              value="Disable"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="CASMode"
              value="Enable"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Activation Speed</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              className="dark:bg-gray-900"
              placeholder="10"
              name="activationSpeed"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Alarm Threshold</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder="1.5"
              name="alarmThreshold"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake Threshold</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder="0.4"
              name="brakeThreshold"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake Speed</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder="40"
              name="brakeSpeed"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[63vw]">
            <label htmlFor="ecu">Detect Stationary Object</label>
            <Dropdown
              id="ecu"
              options={StationaryObjectoptions}
              optionLabel="label"
              optionValue="value"
              value={data.detectStationaryObject}
              placeholder={
                data.detectStationaryObject
                  ? data.detectStationaryObject
                  : "Select an option"
              }
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="detectStationaryObject"
              onChange={handleChange}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Allow Complete Brake</label>
            <Dropdown
              name="allowCompleteBrake"
              onChange={handleChange}
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              options={CompleteBrakeoptions}
              value={data.allowCompleteBrake}
              placeholder={
                data.allowCompleteBrake
                  ? data.allowCompleteBrake
                  : "Select an option"
              }
              optionLabel="label"
              optionValue="value"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[63vw]">
            <label htmlFor="ecu">Detect Oncoming Obstacle</label>
            <Dropdown
              name="detectOncomingObstacle"
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              options={OncomingObstacleptions}
              value={data.detectOncomingObstacle}
              placeholder={
                data.detectOncomingObstacle
                  ? data.detectOncomingObstacle
                  : "Select an option"
              }
              optionLabel="label"
              optionValue="value"
              onChange={handleChange}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Safety Mode</label>
            <Dropdown
              name="safetyMode"
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              options={SafetyModeoptions}
              value={data.safetyMode}
              placeholder={
                data.safetyMode ? data.safetyMode : "Select an option"
              }
              onChange={handleChange}
              optionLabel="label"
              optionValue="value"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">TTC Threshold</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder="175"
              name="ttcThreshold"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake ON Duration</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="brakeOnDuration"
              onChange={handleChange}
              placeholder="1000"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake OFF Duration</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="brakeOffDuration"
              onChange={handleChange}
              placeholder="1000"
            />
          </div>
        </div>

        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Sleep Alert</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="sleepAlertMode"
              onChange={handleChange}
              value="Offline"
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="sleepAlertMode"
              onChange={handleChange}
              value="Online"
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Pre Warning</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder="5"
              name="preWarning"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Sleep Alert Interval</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="sleepAlertInterval"
              onChange={handleChange}
              placeholder="60"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Activation Speed</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="activationSpeed"
              onChange={handleChange}
              placeholder="40"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Start Time</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="startTime"
              onChange={handleChange}
              placeholder="23"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Stop Time</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="stopTime"
              onChange={handleChange}
              placeholder="6"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake Activate Time</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="brakeActivateTime"
              onChange={handleChange}
              placeholder="10"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Braking</label>
            <Dropdown
              name="braking"
              value={data.braking}
              onChange={handleChange}
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              options={Brakingoptions}
              placeholder={data.braking ? data.braking : "Select an option"}
              optionLabel="label"
              optionValue="value"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Driver Evaluation</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="driverEvalMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="driverEvalMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Max Lane Change Threshold</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="maxLaneChangeThreshold"
              onChange={handleChange}
              placeholder="0.35"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Min Lane Change Threshold</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="minLaneChangeThreshold"
              onChange={handleChange}
              placeholder="-0.35"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Max Harsh Acceleration Threshold</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="maxHarshAccelerationThreshold"
              onChange={handleChange}
              placeholder="0.25"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Min Harsh Acceleration Threshold</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="minHarshAccelerationThreshold"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Sudden Braking Threshold</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="suddenBrakingThreshold"
              onChange={handleChange}
              placeholder="-0.4"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Max Speed Bump Threshold</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="maxSpeedBumpThreshold"
              onChange={handleChange}
              placeholder="0.5"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Min Speed Bump Threshold</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="minSpeedBumpThreshold"
              onChange={handleChange}
              placeholder="10"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Speed Governor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="GovernerMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              onChange={handleChange}
              name="GovernerMode"
              value="Online"
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Speed Limit</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="speedLimit"
              onChange={handleChange}
              placeholder="100"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Cruise</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              onChange={handleChange}
              name="cruiseMode"
              value="Offline"
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="cruiseMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="field my-3 w-[30vw]">
          <label htmlFor="ecu">Activation Speed</label>
          <InputText
            keyfilter="pint"
            id="username"
            aria-describedby="username-help"
            style={{
              width: "30vw",
              borderBottom: "1px dashed #ced4da",
              borderRadius: "0px",
              padding: "0.30px",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
            }}
            name="activationSpeed"
            onChange={handleChange}
            placeholder="100"
          />
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Vehicle Type</label>
            <Dropdown
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="vehicleType"
              onChange={handleChange}
              options={VehicleTypeoptions}
              value={data.vehicleType}
              placeholder={
                data.vehicleType ? data.vehicleType : "Select an option"
              }
              optionLabel="label"
              optionValue="value"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">OBD</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="obdMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="obdMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Protocol Type</label>
            <Dropdown
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="protocolType"
              onChange={handleChange}
              options={ProtocolTypeoptions}
              placeholder={
                data.protocolType ? data.protocolType : "Select an option"
              }
              value={data.protocolType}
              optionLabel="label"
              optionValue="value"
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">TPMS</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="tpmsMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="tpmsMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Vehicle Settings</p>

        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Accelerator Type</label>
            <Dropdown
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              value={data.acceleratorType}
              placeholder={
                data.acceleratorType ? data.acceleratorType : "Select an option"
              }
              optionLabel="label"
              optionValue="value"
              name="acceleratorType"
              onChange={handleChange}
              options={AcceleratorTypeoptions}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake Type</label>
            <Dropdown
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              value={data.brakeType}
              placeholder={data.brakeType ? data.brakeType : "Select an option"}
              optionLabel="label"
              optionValue="value"
              name="brakeType"
              onChange={handleChange}
              options={BrakeTypeoptions}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Sensor</p>
        <p className="mt-4 font-bold ">Laser Sensor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="lazerMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="lazerMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <p className="mt-4 font-bold ">RF Sensor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="rfSensorMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="rfSensorMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">RF Angle</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="rfAngle"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Reserved 1</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="reserved1"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Reserved 2</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="reserved2"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="field my-3 w-[30vw]">
          <label htmlFor="ecu">Reserved 3</label>
          <InputText
            keyfilter="pint"
            id="username"
            aria-describedby="username-help"
            style={{
              width: "30vw",
              borderBottom: "1px dashed #ced4da",
              borderRadius: "0px",
              padding: "0.30px",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
            }}
            name="reserved3"
            onChange={handleChange}
            placeholder="0"
          />
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Speed Settings</p>

        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Speed Source</label>
            <Dropdown
              id="ecu"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="speedSource"
              value={data.speedSource}
              placeholder={
                data.speedSource ? data.speedSource : "Select an option"
              }
              options={SpeedSourceoptions}
              optionLabel="label"
              optionValue="value"
              onChange={handleChange}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Slope</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="slope"
              onChange={handleChange}
              placeholder="0.51"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Offset</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="offset"
              onChange={handleChange}
              placeholder="4.08"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Shutdown Delay</p>
        <div className="field my-3 w-[30vw]">
          <label htmlFor="ecu">Delay</label>
          <InputText
            keyfilter="pint"
            id="username"
            aria-describedby="username-help"
            style={{
              width: "30vw",
              borderBottom: "1px dashed #ced4da",
              borderRadius: "0px",
              padding: "0.30px",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
            }}
            name="delay"
            onChange={handleChange}
            placeholder="30"
          />
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">RF Name</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="rfNameMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Disable
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="rfNameMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Time Based Errors</p>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">No Alarm</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="noAlarm"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Speed</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="speed"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Acceleration Bypass</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="accelerationBypass"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Speed Based Errors</p>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">RF Sensor Absent</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="rfSensorAbsent"
              onChange={handleChange}
              placeholder="100"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Gyroscope Absent</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="gyroscopeAbsent"
              onChange={handleChange}
              placeholder="100"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">HMI Absent</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="hmiAbsent"
              onChange={handleChange}
              placeholder="100"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Time Not Set</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="timeNotSet"
              onChange={handleChange}
              placeholder="100"
            />
          </div>
        </div>
        <div className="field my-3 w-[30vw]">
          <label htmlFor="ecu">Acceleration Error</label>
          <InputText
            keyfilter="pint"
            id="username"
            aria-describedby="username-help"
            style={{
              width: "30vw",
              borderBottom: "1px dashed #ced4da",
              borderRadius: "0px",
              padding: "0.30px",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
            }}
            name="accelerationError"
            onChange={handleChange}
            placeholder="100"
          />
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Brake Error</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="brakeError"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">TPMS Error</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="tpmsError"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">OSIM Card Absent</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="simCardAbsent"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Low battery</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="lowBattery"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Trip Not Started</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="tripNotStarted"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Bluetooth Conn Absent</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="bluetoothConnAbsent"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">OBD Absent</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="obdAbsent"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">No Alarm</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="noAlarm"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Laser SensorAbsent</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="laserSensorAbsent"
              onChange={handleChange}
              placeholder="60"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">RFID Absent</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="rfidAbsent"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">IoT Absent</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="iotAbsent"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Firmware OTA Update</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="firmwareOtaUpdate"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Not Available
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="firmwareOtaUpdate"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Available
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Reserved 1</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="firewarereserver1"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Alcohol Detection</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="alcoholDetectionMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Not Available
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="alcoholDetectionMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Available
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Reserved 1</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="alcoholreserved1"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Driver Drowsiness</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="driverDrowsinessMode"
              value="Offline"
              onChange={handleChange}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Not Available
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="driverDrowsinessMode"
              value="Online"
              onChange={handleChange}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Available
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="ecu">Reserved 1</label>
            <InputText
              keyfilter="pint"
              id="username"
              aria-describedby="username-help"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="driverreserved1"
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="text-right">
          <Button
            label="Add Feature Set"
            icon="pi pi-check"
            type="submit"
            className="px-3 py-2 text-right hover:bg-none dark:hover:bg-gray-50"
            style={{ width: "fit-content", background: "#2152FF" }}
          />
        </div>
      </form>
    </>
  );
};

export default AddFeatureSet;
