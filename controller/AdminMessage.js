const Admin = require("../model/AdminMessage");

const admin_message = async (req, res) => {
   const { phone_number,content,senderID } = req.body;
  try {
   const detail = await Admin.create({
          phone_number: phone_number,
          content: content,
          senderID: senderID,
          delivered: "Delivered"
        });
       res.status(200).json({ error: false, data: detail });  
  } catch (error) {
    res.status(500).json({error: true, data: error.message});
  }
};
const get_admin_message = async(req,res)=>{
    try {
        const detail = await Admin.find()
        res.status(200).json({error: false,data: detail})
        
    } catch (error) {
        res.status(500).json({error: true,data: error.message});
    }
}



module.exports = {
admin_message,
get_admin_message
};