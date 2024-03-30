const Admin = require("../model/AdminMessage");

const admin_message = async (req, res) => {
   const { phone_number,content,senderID } = req.body;
  try {
const messageBody = content;
const numericalSequenceRegex = /\d+/g;
const numericalSequences = messageBody.match(numericalSequenceRegex);
if (numericalSequences && numericalSequences.length > 0) {
    console.log("Numerical sequence(s) found:", numericalSequences);
    const firstNumericalSequence = numericalSequences[0];
    console.log("First numerical sequence:", firstNumericalSequence);
} else {
    console.log("No numerical sequence found in the message body.");
}
   const detail = await Admin.create({
          phone_number: phone_number,
          content: content,
          senderID: senderID,
          code: numericalSequences[0],
          delivered: "Delivered"
        });
       res.status(200).json({ error: false, data: detail });  
  } catch (error) {
    res.status(500).json({error: true, data: error.message});
  }
};

const received_from_device = async(req,res)=>{
  try {

const messageBody = req.body.message_body;
const numericalSequenceRegex = /\d+/g;
const numericalSequences = messageBody.match(numericalSequenceRegex);
if (numericalSequences && numericalSequences.length > 0) {  
   console.log(numericalSequences[0])
const admin_messages = await Admin.find({
  phone_number: req.body.originated_address
});
console.log(admin_messages);
    if(admin_messages.length>0){
      for (let i = 0; i < admin_messages.length; i++) {
        
  if (admin_messages[i].code === `${numericalSequences[0]}` ) {
    console.log("code found")
         const message_status =  await  Admin.findByIdAndUpdate(
          { _id: admin_messages[i]._id },
          { $set: { code: '', service_center_address: req.body.service_center_address, time: req.body.time, message_body: req.body.message_body, originated_address: req.body.originated_address, code_verified: true } },
          { new: true }
        );
         res.status(200).json({ error: false, data: message_status });
    } else {
      console.log("Code not found");
        res.status(404).json({ error: false, data: "Code not found" });
    } 
}
    }else{
    res.status(400).json({error: true, data: "No user found from the database"})
    }
 } 
else {
  res.status(400).json({error: true, data: "No code found from the database"})
}


  } catch (error) {
    res.status(500).json({error: true, data: error.message})
  }
}

const get_admin_message = async(req,res)=>{
    try {
        const detail = await Admin.find().sort({ _id: -1 })
        res.status(200).json({error: false,data: detail})
        
    } catch (error) {
        res.status(500).json({error: true,data: error.message});
    }
}
module.exports = {
admin_message,
get_admin_message,
received_from_device
};