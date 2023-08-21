import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import axios from "axios";

const FeatureSet = ({ parameters }) => {
  const [featuresetDetails, setFeaturesetDetails] = useState({});
  const [formData, setFormData] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const handleToggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormData(featuresetDetails);
  }, [featuresetDetails]);

  //edit and update feature set assigned to selected vehicle
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .put(
        `http://localhost:3001/api/featureset/featureset-edit-vehiclefeatureset/${parameters?.propValue}`,
        formData
      )
      .then((res) => {
        if (res.request.status === 200) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //fetch feature set details of selected vehicle
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/featureset/featureset-vehicleFeaturest-details/${parameters?.propValue}`
      )
      .then((res) => {
        setFeaturesetDetails(res.data.vehicleData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [parameters]);

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

  //edit dialog
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="text-right">
            <button onClick={handleToggleEdit}>
              {isEditable ? (
                <i className="pi pi-unlock rounded-full bg-gray-200 p-3 text-green-600" /> // Lock icon when editable
              ) : (
                <i className="pi pi-lock rounded-full bg-gray-200 p-3 text-red-400" /> // Unlock icon when non-editable
              )}
            </button>
          </div>
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
              className="dark:bg-gray-900 dark:text-gray-150"
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
              className="dark:bg-gray-900 dark:text-gray-150"
              onChange={handleChange}
            />
            <small id="username-help">Unique id to identify feature set</small>
          </div>

          <p className="mt-4 font-bold dark:text-gray-300">System Type</p>
          <div className="my-3 flex flex-wrap gap-3">
            <div className="align-items-center flex">
              <input
                type="radio"
                name="mode"
                disabled={!isEditable}
                onChange={handleChange}
                value="Offline"
                checked={formData?.mode === "Offline"}
              />
              <label htmlFor="ingredient1" className="ml-2 dark:text-gray-400">
                Offline Mode
              </label>
            </div>
            <div className="align-items-center flex">
              <input
                type="radio"
                disabled={!isEditable}
                name="mode"
                onChange={handleChange}
                value="Online"
                checked={formData?.mode === "Online"}
              />
              <label htmlFor="ingredient2" className="ml-2 dark:text-gray-400">
                Online Mode
              </label>
            </div>
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">
          Collision Avoidance System
        </p>
        <div className="card justify-content-center mt-5 flex gap-4">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="CASMode"
              value="Disable"
              onChange={handleChange}
              checked={formData?.CASMode === "Disable"}
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              value={formData.detectOncomingObstacles}
              placeholder={
                formData.detectOncomingObstacles
                  ? formData.detectOncomingObstacles
                  : "Select an option"
              }
              optionLabel="label"
              optionValue="value"
              onChange={handleChange}
              className="md:w-14rem mt-2 w-full"
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>
        </div>

        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">Sleep Alert</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="sleepAlertMode"
              onChange={handleChange}
              value="Offline"
              checked={formData?.sleepAlertMode === "Offline"}
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">Driver Evaluation</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="driverEvalMode"
              value="Offline"
              onChange={handleChange}
              checked={formData?.driverEvalMode === "Offline"}
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">Speed Governor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="GovernerMode"
              value="Offline"
              onChange={handleChange}
              checked={formData?.GovernerMode === "Offline"}
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">Cruise</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              onChange={handleChange}
              name="cruiseMode"
              value="Offline"
              checked={formData?.cruiseMode === "Offline"}
              disabled={!isEditable}
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
              disabled={!isEditable}
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
            disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">OBD</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="obdMode"
              value="Offline"
              onChange={handleChange}
              checked={formData?.obdMode === "Offline"}
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">TPMS</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="tpmsMode"
              value="Offline"
              onChange={handleChange}
              checked={formData?.tpmsMode === "Offline"}
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">Vehicle Settings</p>

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
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 text-lg font-bold dark:text-gray-300">Sensor</p>
        <p className="mt-4 font-bold dark:text-gray-300">Laser Sensor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="lazerMode"
              value="Offline"
              onChange={handleChange}
              checked={formData?.lazerMode === "Offline"}
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <p className="mt-4 font-bold dark:text-gray-300">RF Sensor</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="rfSensorMode"
              value="Offline"
              onChange={handleChange}
              checked={formData?.rfSensorMode === "Offline"}
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
            disabled={!isEditable}
          />
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">Speed Settings</p>

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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">Shutdown Delay</p>
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
            disabled={!isEditable}
          />
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">RF Name</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="rfNameMode"
              value="Offline"
              onChange={handleChange}
              checked={formData?.rfNameMode === "Offline"}
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Enable
            </label>
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">Time Based Errors</p>
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
        <p className="mt-4 font-bold dark:text-gray-300">Speed Based Errors</p>
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
            disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
              value={formData?.iotAbsent || ""}
              placeholder={
                formData.iotAbsent ? formData.iotAbsent : "Enter a value"
              }
            />
          </div>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <p className="mt-4 font-bold dark:text-gray-300">Firmware OTA Update</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="firmwareOtaUpdate"
              value="Offline"
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
        <p className="mt-4 font-bold dark:text-gray-300">Alcohol Detection</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="alcoholDetectionMode"
              value="Offline"
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
        <p className="mt-4 font-bold dark:text-gray-300">Driver Drowsiness</p>
        <div className="my-3 flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <input
              type="radio"
              name="driverDrowsinessMode"
              value="Offline"
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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

export default FeatureSet;
