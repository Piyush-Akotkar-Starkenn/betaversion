import React, { useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { MultiSelect } from "primereact/multiselect";

const EditFeatureset = ({ parameters, onSuccess }) => {
  const [customers, setCustomers] = useState([]);
  const [featuresetDetails, setFeaturesetDetails] = useState({});
  const [allCustomers, setAllCustomers] = useState([]);
  const { updateFunc } = useContext(AppContext);
  const [formData, setFormData] = useState({});
  const toastErr = useRef(null);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      selectCustomer: [...customers],
    }));
  }, [customers, featuresetDetails, setFormData, setCustomers]);

  useEffect(() => {
    setFormData(featuresetDetails);
  }, [featuresetDetails]);

  //fetching cutomers
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/featureset/featureset-get-all-customers`
      )
      .then((res) => {
        console.log(res);
        setAllCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //fetching featureset
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/featureset/featureset/${parameters?.propValue}`
      )
      .then((res) => {
        setFeaturesetDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [parameters?.propValue]);

  //making api call to update FS
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/featureset/featureset-edit/${parameters?.propValue}`,
          formData
        )
        .then((res) => {
          updateFunc();
          console.log(res);
          if (onSuccess) {
            onSuccess();
          }
          console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("Error in Adding Featureset");
      console.error(err);
      toastErr.current.show({
        severity: "danger",
        summary: "Error",
        detail: err.response.data.message || "An error occurred",
        life: 3000,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
    return allCustomers?.map((el) => ({
      label: el.first_name + " " + el.last_name,
      value: el.userId,
    }));
  };

  //edit dialog
  return (
    <>
      <Toast ref={toastErr} className="bg-red-400" />
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="flex" style={{ flexDirection: "column" }}>
            <label htmlFor="username">Feature Set ID12345*</label>
            <InputText
              id="username"
              value={featuresetDetails?.featureSetId}
              le={{
                width: "63vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              name="featureSetId"
              onChange={handleChange}
            />
            <small id="username-help">Unique id to identify feature set</small>
          </div>

          <div className="mt-2 flex" style={{ flexDirection: "column" }}>
            <label htmlFor="username">Feature Set Name*</label>
            <InputText
              id="username"
              le={{
                width: "63vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              value={featuresetDetails?.featureSetName}
              name="featureSetName"
              onChange={handleChange}
            />
            <small id="username-help">Unique id to identify feature set</small>
          </div>

          <div className="field my-3  w-[30vw]">
            <label htmlFor="cust">Selected Customer</label>

            <MultiSelect
              value={formData.selectCustomer}
              options={Customersoptions()}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  selectCustomer: e.value,
                }))
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
              optionLabel="label"
              placeholder="Select Customers"
              className="dark:bg-gray-900"
              filter
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
                checked={formData?.mode === "Offline"}
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
                checked={formData?.mode === "Online"}
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
              checked={formData?.CASMode === "Disable"}
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
              checked={formData?.CASMode === "Enable"}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Activation Speed</label>
            <InputText
              keyfilter="pint"
              id="username"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              value={formData?.activationSpeed || ""}
              placeholder={
                formData.activationSpeed
                  ? formData.activationSpeed
                  : "Enter a value"
              }
              name="activationSpeed"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Alarm Threshold</label>
            <InputText
              keyfilter="pint"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={
                formData.alarmThreshold
                  ? formData.alarmThreshold
                  : "Enter a value"
              }
              value={formData?.alarmThreshold || ""}
              name="alarmThreshold"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Brake Threshold</label>
            <InputText
              keyfilter="pint"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              value={formData?.brakeThreshold || ""}
              placeholder={
                formData.brakeThreshold
                  ? formData.brakeThreshold
                  : "Enter a value"
              }
              name="brakeThreshold"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Brake Speed</label>
            <InputText
              keyfilter="pint"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              value={formData?.brakeSpeed || ""}
              placeholder={
                formData.brakeSpeed ? formData.brakeSpeed : "Enter a value"
              }
              name="brakeSpeed"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[63vw]">
            <label htmlFor="stationaryobj">Detect Stationary Object</label>
            <Dropdown
              id="stationaryobj"
              options={StationaryObjectoptions}
              optionLabel="label"
              optionValue="value"
              value={formData.detectStationaryObject}
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={
                formData.detectStationaryObject
                  ? formData.detectStationaryObject
                  : "Select an option"
              }
              name="detectStationaryObject"
              onChange={handleChange}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="combrake">Allow Complete Brake</label>
            <Dropdown
              name="allowCompleteBrake"
              onChange={handleChange}
              id="combrake"
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
              value={formData.allowCompleteBrake}
              placeholder={
                formData.allowCompleteBrake
                  ? formData.allowCompleteBrake
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
            <label htmlFor="obstacle">Detect Oncoming Obstacle</label>
            <Dropdown
              name="detectOncomingObstacle"
              id="obstacle"
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
              value={formData.detectOncomingObstacle}
              placeholder={
                formData.detectOncomingObstacles
                  ? formData.detectOncomingObstacles
                  : "Select an option"
              }
              optionLabel="label"
              optionValue="value"
              onChange={handleChange}
              className="md:w-14rem mt-2 w-full"
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label htmlFor="safety">Safety Mode</label>
            <Dropdown
              name="safetyMode"
              id="safety"
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
              value={formData.safetyMode}
              placeholder={
                formData.safetyMode ? formData.safetyMode : "Select an option"
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
            <label>TTC Threshold</label>
            <InputText
              keyfilter="pint"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              value={formData?.ttcThreshold || ""}
              placeholder={
                formData.ttcThreshold ? formData.ttcThreshold : "Enter a value"
              }
              name="ttcThreshold"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Brake ON Duration</label>
            <InputText
              keyfilter="pint"
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
              placeholder={
                formData.brakeOnDuration
                  ? formData.brakeOnDuration
                  : "Enter a value"
              }
              value={formData?.brakeOnDuration || ""}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Brake OFF Duration</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.brakeOffDuration || ""}
              placeholder={
                formData.brakeOffDuration
                  ? formData.brakeOffDuration
                  : "Enter a value"
              }
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
              checked={formData?.sleepAlertMode === "Offline"}
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
              checked={formData?.sleepAlertMode === "Online"}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Pre Warning</label>
            <InputText
              keyfilter="pint"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              value={formData?.preWarning || ""}
              placeholder={
                formData.preWarning ? formData.preWarning : "Enter a value"
              }
              name="preWarning"
              onChange={handleChange}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Sleep Alert Interval</label>
            <InputText
              keyfilter="pint"
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
              placeholder={
                formData.sleepAlertInterval
                  ? formData.sleepAlertInterval
                  : "Enter a value"
              }
              value={formData?.sleepAlertInterval || ""}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Activation Speed</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.activationSpeed || ""}
              placeholder={
                formData.activationSpeed
                  ? formData.activationSpeed
                  : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Start Time</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.startTime || ""}
              placeholder={
                formData.startTime ? formData.startTime : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Stop Time</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.stopTime || ""}
              placeholder={
                formData.stopTime ? formData.stopTime : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Brake Activate Time</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.brakeActivateTime || ""}
              placeholder={
                formData.brakeActivateTime
                  ? formData.brakeActivateTime
                  : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="braking">Braking</label>
            <Dropdown
              name="braking"
              onChange={handleChange}
              id="braking"
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
              value={formData.braking}
              placeholder={
                formData.braking ? formData.braking : "Select an option"
              }
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
              checked={formData?.driverEvalMode === "Offline"}
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
              checked={formData?.driverEvalMode === "Online"}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Max Lane Change Threshold</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.maxLaneChangeThreshold || ""}
              placeholder={
                formData.maxLaneChangeThreshold
                  ? formData.maxLaneChangeThreshold
                  : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Min Lane Change Threshold</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.minLaneChangeThreshold || ""}
              placeholder={
                formData.minLaneChangeThreshold
                  ? formData.minLaneChangeThreshold
                  : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Max Harsh Acceleration Threshold</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.maxHarshAccelerationThreshold || ""}
              placeholder={
                formData.maxHarshAccelerationThreshold
                  ? formData.maxHarshAccelerationThreshold
                  : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Min Harsh Acceleration Threshold</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.minHarshAccelerationThreshold || ""}
              placeholder={
                formData.minHarshAccelerationThreshold
                  ? formData.minHarshAccelerationThreshold
                  : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Sudden Braking Threshold</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.suddenBrakingThreshold || ""}
              placeholder={
                formData.suddenBrakingThreshold
                  ? formData.suddenBrakingThreshold
                  : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Max Speed Bump Threshold</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.maxSpeedBumpThreshold || ""}
              placeholder={
                formData.maxSpeedBumpThreshold
                  ? formData.maxSpeedBumpThreshold
                  : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Min Speed Bump Threshold</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.minSpeedBumpThreshold || ""}
              placeholder={
                formData.minSpeedBumpThreshold
                  ? formData.minSpeedBumpThreshold
                  : "Enter a value"
              }
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
              checked={formData?.GovernerMode === "Offline"}
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
              checked={formData?.GovernerMode === "Online"}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Speed Limit</label>
            <InputText
              keyfilter="pint"
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
              placeholder={
                formData.speedLimit ? formData.speedLimit : "Enter a value"
              }
              value={formData?.speedLimit || ""}
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
              checked={formData?.cruiseMode === "Offline"}
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
              checked={formData?.cruiseMode === "Online"}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="field my-3 w-[30vw]">
          <label>Activation Speed</label>
          <InputText
            keyfilter="pint"
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
            value={formData?.activationSpeed || ""}
            placeholder={
              formData.activationSpeed
                ? formData.activationSpeed
                : "Enter a value"
            }
          />
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="vehicle">Vehicle Type</label>
            <Dropdown
              id="vehicle"
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
              value={formData.vehicleType}
              placeholder={
                formData.vehicleType ? formData.vehicleType : "Select an option"
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
              checked={formData?.obdMode === "Offline"}
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
              checked={formData?.obdMode === "Online"}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="protocol">Protocol Type</label>
            <Dropdown
              id="protocol"
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
              value={formData.protocolType}
              placeholder={
                formData.protocolType
                  ? formData.protocolType
                  : "Select an option"
              }
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
              checked={formData?.tpmsMode === "Offline"}
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
              checked={formData?.tpmsMode === "Online"}
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
            <label htmlFor="acc">Accelerator Type</label>
            <Dropdown
              id="acc"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              value={formData.acceleratorType}
              placeholder={
                formData.acceleratorType
                  ? formData.acceleratorType
                  : "Select an option"
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
            <label htmlFor="brake">Brake Type</label>
            <Dropdown
              id="brake"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              placeholder={
                formData.brakeType ? formData.brakeType : "Select an option"
              }
              optionLabel="label"
              optionValue="value"
              name="brakeType"
              value={formData.brakeType}
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
              checked={formData?.lazerMode === "Offline"}
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
              checked={formData?.lazerMode === "Online"}
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
              checked={formData?.rfSensorMode === "Offline"}
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
              checked={formData?.rfSensorMode === "Online"}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>RF Angle</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.rfAngle || ""}
              placeholder={
                formData.rfAngle ? formData.rfAngle : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Reserved 1</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.reserved1 || ""}
              placeholder={
                formData.reserved1 ? formData.reserved1 : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Reserved 2</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.reserved2 || ""}
              placeholder={
                formData.reserved2 ? formData.reserved2 : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="field my-3 w-[30vw]">
          <label>Reserved 3</label>
          <InputText
            keyfilter="pint"
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
            value={formData?.reserved3 || ""}
            placeholder={
              formData.reserved3 ? formData.reserved3 : "Enter a value"
            }
          />
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Speed Settings</p>

        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label htmlFor="speed">Speed Source</label>
            <Dropdown
              id="speed"
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
              value={formData.speedSource}
              placeholder={
                formData.speedSource ? formData.speedSource : "Select an option"
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
            <label>Slope</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.slope || ""}
              placeholder={formData.slope ? formData.slope : "Enter a value"}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Offset</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.offset || ""}
              placeholder={formData.offset ? formData.offset : "Enter a value"}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Shutdown Delay</p>
        <div className="field my-3 w-[30vw]">
          <label>Delay</label>
          <InputText
            keyfilter="pint"
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
            value={formData?.delay || ""}
            placeholder={formData.delay ? formData.delay : "Enter a value"}
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
              checked={formData?.rfNameMode === "Offline"}
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
              checked={formData?.rfNameMode === "Online"}
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
            <label>No Alarm</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.noAlarm || ""}
              placeholder={
                formData.noAlarm ? formData.noAlarm : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Speed</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.speed || ""}
              placeholder={formData.speed ? formData.speed : "Enter a value"}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Acceleration Bypass</label>
            <InputText
              keyfilter="pint"
              style={{
                width: "30vw",
                borderBottom: "1px dashed #ced4da",
                borderRadius: "0px",
                padding: "0.30px",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
              value={formData?.accelerationBypass || ""}
              placeholder={
                formData.accelerationBypass
                  ? formData.accelerationBypass
                  : "Enter a value"
              }
              name="accelerationBypass"
              onChange={handleChange}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold ">Speed Based Errors</p>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>RF Sensor Absent</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.rfSensorAbsent || ""}
              placeholder={
                formData.rfSensorAbsent
                  ? formData.rfSensorAbsent
                  : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Gyroscope Absent</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.gyroscopeAbsent || ""}
              placeholder={
                formData.gyroscopeAbsent
                  ? formData.gyroscopeAbsent
                  : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>HMI Absent</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.hmiAbsent || ""}
              placeholder={
                formData.hmiAbsent ? formData.hmiAbsent : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Time Not Set</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.timeNotSet || ""}
              placeholder={
                formData.timeNotSet ? formData.timeNotSet : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="field my-3 w-[30vw]">
          <label>Acceleration Error</label>
          <InputText
            keyfilter="pint"
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
            value={formData?.accelerationError || ""}
            placeholder={
              formData.accelerationError
                ? formData.accelerationError
                : "Enter a value"
            }
          />
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Brake Error</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.brakeError || ""}
              placeholder={
                formData.brakeError ? formData.brakeError : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>TPMS Error</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.tpmsError || ""}
              placeholder={
                formData.tpmsError ? formData.tpmsError : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>OSIM Card Absent</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.simCardAbsent || ""}
              placeholder={
                formData.simCardAbsent
                  ? formData.simCardAbsent
                  : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Low battery</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.lowBattery || ""}
              placeholder={
                formData.lowBattery ? formData.lowBattery : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Trip Not Started</label>
            <InputText
              keyfilter="pint"
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
              placeholder={
                formData.tripNotStarted
                  ? formData.tripNotStarted
                  : "Enter a value"
              }
              value={formData?.tripNotStarted || ""}
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>Bluetooth Conn Absent</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.bluetoothConnAbsent || ""}
              placeholder={
                formData.bluetoothConnAbsent
                  ? formData.bluetoothConnAbsent
                  : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>OBD Absent</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.obdAbsent || ""}
              placeholder={
                formData.obdAbsent ? formData.obdAbsent : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>No Alarm</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.noAlarm || ""}
              placeholder={
                formData.noAlarm ? formData.noAlarm : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Laser SensorAbsent</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.laserSensorAbsent || ""}
              placeholder={
                formData.laserSensorAbsent
                  ? formData.laserSensorAbsent
                  : "Enter a value"
              }
            />
          </div>
          <div className="field my-3 w-[30vw]">
            <label>RFID Absent</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.rfidAbsent || ""}
              placeholder={
                formData.rfidAbsent ? formData.rfidAbsent : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>IoT Absent</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.iotAbsent || ""}
              placeholder={
                formData.iotAbsent ? formData.iotAbsent : "Enter a value"
              }
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
              checked={formData?.firmwareOtaUpdate === "Offline"}
            />
            <label htmlFor="firmwareOtaUpdate1" className="ml-2">
              Not Available
            </label>
          </div>
          <div className="align-items-center flex">
            <input
              type="radio"
              name="firmwareOtaUpdate"
              value="Online"
              onChange={handleChange}
              checked={formData?.firmwareOtaUpdate === "Online"}
            />
            <label htmlFor="firmwareOtaUpdate2" className="ml-2">
              Available
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Reserved 1</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.firewarereserver1 || ""}
              placeholder={
                formData.firewarereserver1
                  ? formData.firewarereserver1
                  : "Enter a value"
              }
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
              checked={formData?.alcoholDetectionMode === "Offline"}
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
              checked={formData?.alcoholDetectionMode === "Online"}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Available
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Reserved 1</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.alcoholreserved1 || ""}
              placeholder={
                formData.alcoholreserved1
                  ? formData.alcoholreserved1
                  : "Enter a value"
              }
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
              checked={formData?.driverDrowsinessMode === "Offline"}
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
              checked={formData?.driverDrowsinessMode === "Online"}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Available
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="field my-3 w-[30vw]">
            <label>Reserved 1</label>
            <InputText
              keyfilter="pint"
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
              value={formData?.driverreserved1 || ""}
              placeholder={
                formData.driverreserved1
                  ? formData.driverreserved1
                  : "Enter a value"
              }
            />
          </div>
        </div>
        <div className="text-right">
          <Button
            label="Update Feature Set"
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

export default EditFeatureset;
