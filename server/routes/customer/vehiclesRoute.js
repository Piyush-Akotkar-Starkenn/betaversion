const express = require("express");
const {
  // addVehicle,
  // editVehicle,
  // getAllvehicles,
  // getUserVehicles,
  // deleteVehicle,
  totalVehicles,
} = require("../../controllers/customer/vehiclesController");
const vehiclesRouter = express.Router();

// //add the vehicle into databse
// vehiclesRouter.post("/add-vehicle", addVehicle);

// //update the vehicle details
// vehiclesRouter.put("/edit-vehicle/:vehicle_uuid", editVehicle);

// //get list of all users
// vehiclesRouter.get("/get-alluser-vehiclelist", getAllvehicles);

// //get list of vehicle assign to particular user
// vehiclesRouter.get("/get-user-vehiclelist/:user_uuid", getUserVehicles);

// //delete the vehicle by updating the status
// vehiclesRouter.put("/delete-vehicle/:vehicle_uuid", deleteVehicle);

// Get total vehicles count[admin]
vehiclesRouter.get("/total-vehicles", totalVehicles);

module.exports = { vehiclesRouter };
