const express = require('express');
const router = express.Router();
const { admin_message,get_admin_message,received_from_device} = require('../controller/AdminMessage');

router.post("/register",admin_message);
router.get("/fetch",get_admin_message);
router.post("/device-message",received_from_device)

const bcrypt = require("bcryptjs")
 const login = require("../model/Login")
 router.post("/login",async(req,res)=>{
    try {

         const user = await login.findOne({email: req.body.email});
     if(!user){
        return res.status(400).json({error: true,message: "Please try to login with correct credentials"})
     }
     const comparePass = await bcrypt.compare(req.body.password,user.password);
     if(!comparePass){
        return res.status(400).json({error: true,message: "Please try to login with correct credentials"});
     }
     res.status(200).json({error: false,message: user._id});

    //      const salt = await bcrypt.genSalt(10);
    //         const securePass = await bcrypt.hash(req.body.password,salt)
    //   const  data = await login.create({
    //             email: req.body.email,
    //             password: securePass,
                
    //         });
    //         res.status(200).json({error: false,detail: data});
        
    } catch (error) {
        res.status(500).json({error: true,data: error.message})
    }
 })

module.exports = router;