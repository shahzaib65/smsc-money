const express = require('express');
const { register_phone_number,verifyOtp,fetchUsers,fetchUserByID,deleteUser,addEmail} = require('../controller/User');
const router = express.Router();
//login route
router.post("/register",register_phone_number);
router.post("/verifyOtp",verifyOtp);
router.get("/fetch",fetchUsers);
router.post("/fetchUserByID",fetchUserByID);
router.post("/delete",deleteUser);
router.post("/addEmail",addEmail)

module.exports = router;