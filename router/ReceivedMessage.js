const express = require('express');
const router = express.Router();
const {get_received_messages} = require('../controller/ReceivedMessage');


//router.post("/status",received_message);
router.get("/messages",get_received_messages);

module.exports = router;