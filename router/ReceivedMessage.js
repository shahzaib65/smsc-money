const express = require('express');
const router = express.Router();
const {fetch_received_messages} = require('../controller/ReceivedMessage');


//router.post("/status",received_message);
router.get("/messages",fetch_received_messages);

module.exports = router;