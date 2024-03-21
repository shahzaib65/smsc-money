const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    phone_number: {
      type: String
    },
    content: {
      type: String,
      default: ""
    },
    senderID:{
      type: String,
      default: ""
    },
    delivered: {
        type: String,
        default: "Undelivered"
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("AdminMessage", adminSchema);


