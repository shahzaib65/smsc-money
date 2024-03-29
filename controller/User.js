const jwt = require("jsonwebtoken");
const User = require("../model/User");
const moment = require("moment");
const crypto = require("crypto");



function generateReferralCode() {
  return crypto.randomBytes(5).toString("hex").toUpperCase();
}




const register_phone_number = async (req, res) => {
   const { phone_number,otp } = req.body;
  try {
    const user = await User.findOne({ phone_number: phone_number });
  if (!user) {
    const referralCode = generateReferralCode();
    const detail = await User.create({
          phone_number: phone_number,
          referral_code: referralCode,
          otp: otp
        });
       res.status(200).json({ error: false, data: detail });  
   
  } else {
    const data = await User.findByIdAndUpdate(
          { _id: user._id },
          { $set: { otp: otp } },
          { new: true }
        );
        res.status(200).json({ error: false, data: data });
  }
  } catch (error) {
    res.status(500).json({error: true, data: error.message});
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
    const data = await User.find();
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
    res.status(200).json({ error: false, user: data });
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
    const doc = await User.findOne({paypal_email: req.body.email});
    if(doc){
     res.status(200).json({error: true,message: "Email already exist"})
    }else{
         const data = await User.findByIdAndUpdate(
        { _id: req.body.id },
        { $set: { paypal_email: req.body.email } },
        { new: true }
      );
      res.status(200).json({ error: false, user: data }); 
    }
     
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const amount_in_acc = async(req,res)=>{
  try {
     const data = await User.findOne({_id: req.body.id});
     if(data){
       const data = await User.findByIdAndUpdate(
        { _id: req.body.id },
        { $inc: { user_amount: 0.5 } },
        { new: true }
      );
      res.status(200).json({error: false, user: data});
     }else{
      res.status(404).json({error: true, user: "User not found"})
     }
  } catch (error) {
    res.status(500).json({error: false, message: error.message})
  }
};
const referral_code = async(req,res)=>{
  try {
     const data = await User.findOne({referral_code: req.body.referral_code});
     if(data){
       const data = await User.findByIdAndUpdate(
        { _id: req.body.id },
        { $inc: { user_amount: 1 } },
        { new: true }
      );
      res.status(200).json({error: false, user: data});
     }else{
      res.status(404).json({error: true,message: "Referral code not found"})
     }
  } catch (error) {
    res.status(500).json({error: false, message: error.message});
  }
}

module.exports = {
  register_phone_number,
  verifyOtp,
  fetchUsers,
  fetchUserByID,
  deleteUser,
  addEmail,
  amount_in_acc,
  referral_code
};
