require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({origin: "*"}));
app.use(express.json());
const connectToMongo = require('./db');

 app.use("/api/user",require("./router/User"));
 app.use("/api/admin/message",require("./router/AdminMessage"));

app.listen(process.env.PORT,()=>{
    console.log("Server is connected with",process.env.PORT);
    connectToMongo();
})