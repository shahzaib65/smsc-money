const express = require('express');
const router = express.Router();
const {received_message} = require('../controller/ReceivedMessage');


router.post("/status",received_message);

module.exports = router;