const mongoose = require("mongoose");
const receiveSchema = new mongoose.Schema(
  {
    service_center_address: {
      type: String,
      default: ""
    },
    time: {
      type: String
    },
    status:{
      type: String
    },
    message_body: {
        type: String,
    },
     originated_address: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ReceivedMessage", receiveSchema);


