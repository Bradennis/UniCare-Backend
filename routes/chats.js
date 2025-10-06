const express = require("express");
const multer = require("multer");
const path = require("path");
const { accessSingleChat, sendMessage } = require("../Controllers/chats");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/audioFiles");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.route("/").post(accessSingleChat);
router.route("/send").post(sendMessage);
router.route("/sendVoiceNote").post(upload.single("voiceNote"), (req, res) => {
  try {
    res.status(200).json(req.file.filename);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
