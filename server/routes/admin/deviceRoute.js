const express = require("express");
const {
  // addDevice,
  // editDevice,
  // deleteDevice,
  // getDevices,
  // getusersDevices,
  // getUserEcu,
  // getUserIot,
  // getUserDMS,
  deviceCount,
} = require("../../controllers/admin/deviceController");
const deviceRouter = express.Router();

// //add the device
// deviceRouter.post("/add-device", addDevice);

// //update the device
// deviceRouter.put("/edit-device/:device_id", editDevice);

// //delete the device by updating the status
// deviceRouter.put("/delete-device/:device_id", deleteDevice);

// //get list of all devices
// deviceRouter.get("/list-devices", getDevices);

// //get list of all devices assign to particular user
// deviceRouter.get("/get-user-devices-list/:user_uuid", getusersDevices);

// //get list of ecu assign to particular user
// deviceRouter.get("/get-user-ecu/:user_uuid", getUserEcu);

// //get list of all  iot assign to particular user
// deviceRouter.get("/get-user-iot/:user_uuid", getUserIot);

// //get list of all dms assign to particular user
// deviceRouter.get("/get-user-dms/:user_uuid", getUserDMS);

// Get total devices count
deviceRouter.get("/total-devices", deviceCount);

module.exports = { deviceRouter };
