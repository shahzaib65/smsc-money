const express = require('express');
const { register_phone_number,verifyOtp,fetchUsers,fetchUserByID,deleteUser,addEmail,amount_in_acc,referral_code} = require('../controller/User');
const router = express.Router();
router.post("/register",register_phone_number);
router.post("/verifyOtp",verifyOtp);
router.get("/fetch",fetchUsers);
router.post("/fetchUserByID",fetchUserByID);
router.post("/delete",deleteUser);
router.post("/addEmail",addEmail)
router.post("/add-amount",amount_in_acc)
router.post("/referral-code",referral_code)

module.exports = router;