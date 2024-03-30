const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    phone_number: {
      type: String,
    },
    content: {
      type: String,
      default: "",
    },
    senderID: {
      type: String,
      default: "",
    },
    delivered: {
      type: String,
      default: "Undelivered",
    },
    code: {
      type: String,
      default: "",
    },
    service_center_address: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    message_body: {
      type: String,
      default: "",
    },
    originated_address: {
      type: String,
      default: "",
    },
    code_verified: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("AdminMessage", adminSchema);
