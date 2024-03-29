require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({origin: "*"}));
app.use(express.json());
const connectToMongo = require('./db');
const ReceivedMessage = require("./model/ReceivedMessage")

 app.use("/api/user",require("./router/User"));
 app.use("/api/admin/message",require("./router/AdminMessage"));
 app.use("/api/withdraw", require("./router/Withdraw"));
 app.use('/api/received', require("./router/ReceivedMessage"));


 app.post("/api/device/message",async(req,res)=>{
    try {
        
     const detail  = await ReceivedMessage.create({
        "service_center_address": req.body.service_center_address,
        "time": req.body.time,
        "status": req.body.status,
        "message_body": req.body.message_body,
        "originated_address": req.body.originated_address
     })
     res.status(200).json({error: false,message: detail});

    } catch (error) {
        res.status(500).json({error: true,message: error.message});
    }
 })


 


app.listen(process.env.PORT,()=>{
    console.log("Server is connected with",process.env.PORT);
    connectToMongo();
})