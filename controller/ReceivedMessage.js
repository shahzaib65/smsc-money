const ReceivedMsg = require("../model/ReceivedMessage");

const receive_message = async (req, res) => {
  try {
   const detail =  new ReceivedMsg()
   detail.save(req.body);
       res.status(200).json({ error: false, data: detail });  
  } catch (error) {
    res.status(500).json({error: true, data: error.message});
  }
};
module.exports = {
receive_message

};