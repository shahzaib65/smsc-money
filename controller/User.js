const jwt = require("jsonwebtoken");
const User = require("../model/User");
const generateOTP = require("../service/generateOtp");
const moment = require("moment");
const axios = require("axios");
const crypto = require("crypto");

function generateReferralCode() {
  return crypto.randomBytes(5).toString("hex").toUpperCase();
}

const loginUser = async (req, res) => {
  const { phone_number } = req.body;
  const user = await User.findOne({ phone_number: phone_number });
  if (!user) {
    const otp = generateOTP();
    const referralCode = generateReferralCode();
    const message = `${otp} is your smscmoney code`;
    axios
      .get(
        `https://cp.inmobilews.com/API/SendSMS?username=adam.poole85&apiId=A4b9tySp&json=True&destination=${phone_number}&source=IMWS&text=${message}`
      )
      .then(async (response) => {
        console.log(response);
        const detail = await User.create({
          phone_number: phone_number,
          otp: otp,
          referral_code: referralCode,
        });
        res.status(200).json({ error: false, data: detail });
      })
      .catch((err) => {
        res.status(500).json({ error: true, data: err.message });
      });
  } else {
    const otp = generateOTP();
    const message = `${otp} is your smscmoney code`;
    axios
      .get(
        `https://cp.inmobilews.com/API/SendSMS?username=adam.poole85&apiId=A4b9tySp&json=True&destination=${phone_number}&source=IMWS&text=${message}`
      )
      .then(async (response) => {
        console.log(response);
        const data = await User.findByIdAndUpdate(
          { _id: user._id },
          { $set: { otp: otp } },
          { new: true }
        );
        res.status(200).json({ error: false, data: data });
      })
      .catch((err) => {
        res.status(500).json({ error: true, data: err.message });
      });
  }
};

function isOTPExpired(createdAt) {
  const expirationTime = moment(createdAt).add(2, "minutes"); // OTP expires after 2 minutes
  return moment() > expirationTime;
}

const verifyOtp = async (req, res) => {
  const user = await User.findOne({ otp: req.body.otp });
  if (user) {
    const isExpired = isOTPExpired(user.updatedAt);
    if (isExpired) {
      res.status(404).json({ error: true, data: "Your otp is expired" });
    } else {
      if (user.user_account_verified === false) {
        const data = await User.findByIdAndUpdate(
          { _id: user._id },
          { $set: { otp: "", user_account_verified: true } },
          { new: true }
        );
        res.status(200).json({ error: false, message: data });
      } else {
        const data = await User.findByIdAndUpdate(
          { _id: user._id },
          { $set: { otp: "" } },
          { new: true }
        );
        res.status(200).json({ error: false, message: data });
      }
    }
  } else {
    res.status(404).json({ error: true, message: "Your otp not found" });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json({ error: false, users: data });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const fetchUserByID = async (req, res) => {
  try {
    console.log(req.body);
    const data = await User.findOne({ _id: req.body.id });
    if(data){
    res.status(200).json({ error: false, code: data.referral_code });
    }
   
    
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }
    res
      .status(200)
      .json({ error: false, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: true, message: error.message });
  }
};

const addEmail = async (req, res) => {
  try {
      const data = await User.findByIdAndUpdate(
        { _id: req.body.id },
        { $set: { paypal_email: req.body.email } },
        { new: true }
      );
      res.status(200).json({ error: false, user: data }); 
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = {
  loginUser,
  verifyOtp,
  fetchUsers,
  fetchUserByID,
  deleteUser,
  addEmail,
};
