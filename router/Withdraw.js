const express = require('express');
const router = express.Router();
const {register_withdraw,updateWithdraw} = require("../controller/Withdraw");
router.post("/request",register_withdraw);
router.post("/withdraw-status",updateWithdraw)


module.exports = router;