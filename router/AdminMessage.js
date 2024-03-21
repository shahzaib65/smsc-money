const express = require('express');
const router = express.Router();
const { admin_message,get_admin_message} = require('../controller/AdminMessage');

router.post("/register",admin_message);
router.get("/fetch",get_admin_message);

module.exports = router;