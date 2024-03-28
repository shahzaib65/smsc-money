const express = require('express');
const router = express.Router();
const {register_withdraw,updateWithdraw,getWithdraw} = require("../controller/Withdraw");
router.post("/request",register_withdraw);
router.post("/withdraw-status",updateWithdraw)
router.get("/fetch",getWithdraw);


module.exports = router;