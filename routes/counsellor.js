const express = require("express");
const router = express.Router();

const {
  getAllCounsellors,
  deleteCounsellor,
} = require("../Controllers/counsellorController.js");

router.route("/getCounsellors").get(getAllCounsellors);
router.route("/deleteCounsellor").post(deleteCounsellor);
module.exports = router;
