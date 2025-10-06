const express = require("express");
const router = express.Router();

const {
  getAllDoctors,
  deleteDoctor,
  getUser,
  updateUser,
  getAllUsers,
  changePassword,
  getDoctorAppointments,
  changeAppointmentStatus,
  getApprovedDoctorAppointments,
  tryRoute,
} = require("../Controllers/doctorController.js");
const middleware = require("../MiddleWare/StudentAuthMiddleWare.js");

router.route("/getDoctors").get(getAllDoctors);
router.route("/deleteDoctor").post(deleteDoctor);
router.route("/UserInfo/:id").get(getUser);
router.route("/updateUserInfo/:id").put(updateUser);
router.route("/getStudentUsers").get(getAllUsers);
router.route("/changePassword").post(changePassword);
router.route("/getAppointmentsByDoctorId").post(getDoctorAppointments);
router.route("/changeAppointmentStatus").post(changeAppointmentStatus);
router.route("/getApprovedAppointments").get(getApprovedDoctorAppointments);
router.route("/try").get(tryRoute);

module.exports = router;
