const ReceivedMsg = require("../model/ReceivedMessage");

// const receive_message = async (req, res) => {
//   try {
//    const detail =  new ReceivedMsg()
//    detail.save(req.body);
//        res.status(200).json({ error: false, data: detail });  
//   } catch (error) {
//     res.status(500).json({error: true, data: error.message});
//   }
// };

 const get_received_messages = async(req,res)=>{
  try {
    const messages = await ReceivedMsg.find();
    res.status(200).json({error: false, data: messages})
  } catch (error) {
    res.status(500).json({error: true, data: error.message})
  }
 }

module.exports = {
get_received_messages

};