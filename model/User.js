const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    phone_number: {
      type: String
    },
    referral_code: {
      type: String,
      default: ""
    },
    user_amount:{
      type: Number,
      default: 0
    },
    otp: {
      type: String,
      default: ""
    },
    payment_method:{
      type: String,
      default: "PayPal"
    },
    paypal_email: {
      type: String,
      default: ""
    },
    login: {
      type: Boolean,
      default: false
    },
    deviceToken: {
        type: String,
        default: ""
    },
    user_account_verified: {
        type: Boolean,
        default: false
    },
    user_message_received: {
      type:Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);


