const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      voiceNote: { type: String },
      vid: { type: String },
      img: { type: String },
      aud: { type: String },
      pdf: { type: String },
      pdfOriginalName: { type: String },
      pdfSize: { type: String },
      senderImg: { type: String },
      senderUsername: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Chat", ChatSchema);
