const pool = require("../../config/db.js");
const moment = require("moment-timezone");
const logger = require("../../logger.js");

// //Add the device to database
// const addDevice = async (req, res) => {
//   const { device_id, device_type, user_uuid, sim_number } = req.body;
//   //connection to database
//   const connection = await db();

//   //creating current date and time
//   let createdAt = new Date();
//   let currentTimeIST = moment
//     .tz(createdAt, "Asia/Kolkata")
//     .format("YYYY-MM-DD HH:mm:ss a");

//   try {
//     const checkQuery = "SELECT sim_number from devices WHERE sim_number=?";

//     [checksim] = await connection.execute(checkQuery, [sim_number]);

//     try {
//       const addQuery =
//         "INSERT INTO devices(`device_i`,`device_type`,`user_uuid`,`sim_number`,`device_status`,`created_at`,`created_by`,`modified_at`,`modified_by`) VALUES (?,?,?,?,?,?,?,?,?)";

//       const values = [
//         device_id,
//         device_type,
//         user_uuid,
//         sim_number,
//         1,
//         currentTimeIST,
//         user_uuid,
//         currentTimeIST,
//         user_uuid,
//       ];

//       const [results] = await connection.execute(addQuery, values);

//       res.status(201).json({
//         message: "Device added successfully",
//         totalCount: results.length,
//         results,
//       });
//     } catch (err) {
//       res.status(500).send({ message: "Error in adding device", Error: err });
//     } finally {
//       connection.release();
//     }
//   } catch (err) {
//     res.status(500).send({ message: "Sim_number already exists", error: err });
//   }
// };

// //Update the device
// const editDevice = async (req, res) => {
//   const { device_id, device_type, user_uuid, sim_number } = req.body;
//   // Check Email and Phone Number Already Exist
//   const [existingEmailRows] = await connection.execute(
//     "SELECT email FROM users WHERE email = ?",
//     [email]
//   );
//   if (existingEmailRows.length > 0) {
//     return res.status(409).json({ message: "This Email Already Used" });
//   }

//   const [existingPhoneRows] = await connection.execute(
//     "SELECT phone FROM users WHERE phone = ?",
//     [phone]
//   );
//   if (existingPhoneRows.length > 0) {
//     return res.status(409).json({ message: "This Phone Number Already Used" });
//   }
//   //connection to database
//   const connection = await db();

//   //creating current date and time
//   let createdAt = new Date();
//   let currentTimeIST = moment
//     .tz(createdAt, "Asia/Kolkata")
//     .format("YYYY-MM-DD HH:mm:ss a");

//   try {
//     const editQuery = `UPDATE devices SET device_id=?, device_type = ?, user_uuid = ?, sim_number = ?, modified_at = ?, modified_by = ? WHERE device_id = ?`;

//     const values = [
//       device_id,
//       device_type,
//       user_uuid,
//       sim_number,
//       currentTimeIST,
//       user_uuid,
//       req.params.device_id,
//     ];

//     const [results] = await connection.execute(editQuery, values);
//     res.status(201).json({
//       message: "Device updated successfully",
//       totalCount: results.length,
//       results,
//     });
//   } catch (err) {
//     res.status(500).send({ message: "Error in updating device", Error: err });
//   } finally {
//     connection.release();
//   }
// };

// //update the device status to deactivate
// const deleteDevice = async (req, res) => {
//   const { device_id } = req.params;

//   const { user_uuid } = req.body;

//   //connection to database
//   const connection = await db();

//   //creating current date and time
//   let createdAt = new Date();
//   let currentTimeIST = moment
//     .tz(createdAt, "Asia/Kolkata")
//     .format("YYYY-MM-DD HH:mm:ss a");

//   try {
//     const deleteQuery =
//       "UPDATE devices SET device_status=?, modified_at=?, modified_by=? WHERE device_id=?";

//     const [results] = await connection.execute(deleteQuery, [
//       2,
//       currentTimeIST,
//       user_uuid,
//       device_id,
//     ]);

//     res.status(201).send({
//       message: "Device deleted successfully",
//       totalCount: results.length,
//       results,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .send({ message: "Error in deleting the device", Error: err });
//   } finally {
//     connection.release();
//   }
// };

// //get list of all devices from database whoes status=active
// const getDevices = async (req, res) => {
//   const connection = await db();

//   try {
//     const getQuery = "SELECT * FROM devices WHERE device_status=?";
//     const [devices] = await connection.execute(getQuery, [1]);

//     res.status(200).send({
//       message: "Successfully got list of all devices",
//       totalCount: devices.length,
//       devices,
//     });
//   } catch (err) {
//     res.status(500).send({ message: "Error in getting the list", Error: err });
//   } finally {
//     connection.release();
//   }
// };

// //get list of devices which are assign to particular user
// const getusersDevices = async (req, res) => {
//   const { user_uuid } = req.params;

//   const connection = await db();

//   try {
//     const getUserDevices =
//       "SELECT * FROM devices WHERE device_status=? AND user_uuid=?";

//     const [results] = await connection.execute(getUserDevices, [1, user_uuid]);

//     res.status(200).send({
//       message: "Successfully got list of users devices",
//       devices,
//       results,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .send({ message: "Error in getting users devices", Error: err });
//   } finally {
//     connection.release();
//   }
// };

// //get list of all ecu which are not assign to any vehicle and device assign to particular user
// const getUserEcu = async (req, res) => {
//   const { user_uuid } = req.params;

//   const connection = await db();

//   try {
//     const getQuery =
//       "SELECT id, device_id, device_type, sim_number FROM devices LEFT JOIN vehicles ON devices.device_id = vehicles.ecu WHERE devices.device_type = 'ECU' AND vehicles.vehicle_uuid IS NULL AND devices.user_uuid = ? AND devices.device_status = 1";
//     const [results] = await connection.execute(getQuery, [user_uuid]);
//     res.status(200).send({
//       message: "Successfuly got list of ECU",
//       totalCount: results.length,
//       results,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .send({ message: "Error in getting the users ecu", Error: err });
//   } finally {
//     connection.release();
//   }
// };

// //get list of all iot which are not assign to any vehicle and device assign to particular user
// const getUserIot = async (req, res) => {
//   const { user_uuid } = req.params;

//   const connection = await db();

//   try {
//     const getQuery =
//       "SELECT id, device_id, device_type, sim_number FROM devices LEFT JOIN vehicles ON devices.device_id = vehicles.iot WHERE devices.device_type = 'IoT' AND vehicles.vehicle_uuid IS NULL AND devices.user_uuid = ? AND devices.device_status = 1";
//     const [results] = await connection.execute(getQuery, [user_uuid]);
//     res.status(200).send({
//       message: "Successfully got list of IoT",
//       totalCount: results.length,
//       results,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .send({ message: "Error in getting the users ecu", Error: err });
//   } finally {
//     connection.release();
//   }
// };

// //get list of all dms which are not assign to any vehicle and device assign to particular user
// const getUserDMS = async (req, res) => {
//   const { user_uuid } = req.params;

//   const connection = await db();

//   try {
//     const getQuery =
//       "SELECT id, device_id, device_type, sim_number FROM devices LEFT JOIN vehicles ON devices.device_id = vehicles.dms WHERE devices.device_type = 'DMS' AND vehicles.vehicle_uuid IS NULL AND devices.user_uuid = ? AND devices.device_status = 1";
//     const [results] = await connection.execute(getQuery, [user_uuid]);
//     res.status(200).send({
//       message: "Successfully got list of DMS",
//       totalCount: results.length,
//       results,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .send({ message: "Error in getting the users ecu", Error: err });
//   } finally {
//     connection.release();
//   }
// };

// get all devices count
const deviceCount = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "SELECT COUNT(*) AS count FROM devices WHERE device_status != ?",
      [0]
    );
    res
      .status(200)
      .json({ message: "Successfully received devices count.", result });
    connection.release();
  } catch (error) {
    logger.error("Error in fetching data", error);
    res.status(501).json({ message: "Unable to fetch total devices!" });
  }
};

module.exports = {
  // addDevice,
  // editDevice,
  // deleteDevice,
  // getDevices,
  // getusersDevices,
  // getUserEcu,
  // getUserIot,
  // getUserDMS,
  deviceCount,
};
