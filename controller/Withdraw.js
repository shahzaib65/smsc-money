const withdraw = require("../model/WithdrawAmount");
const User = require("../model/User");

const register_withdraw = async (req, res) => {
  try {
    const result = await withdraw.findOne({email: req.body.email });
  if (result) {
    res.status(200).json({error: false, message: "Request processed"})
  } else {
const doc = await withdraw.create({
          user_id: req.body.id,
          email: req.body.email,
          amount: req.body.amount
        });
     if(doc){
      const doc = await User.findOne({_id: req.body.id})
      let finalAmount = doc.user_amount - req.body.amount
  const data = await User.findByIdAndUpdate(
          { _id: req.body.id },
          { $set: { user_amount: finalAmount } },
          { new: true }
        );
        res.status(200).json({ error: false, data: data });
     }
  }
  } catch (error) {
    res.status(500).json({error: true, data: error.message});
  }
};


const updateWithdraw = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(
        { _id: req.body.id },
        { $set: { payment_status: 'completed' } },
        { new: true }
      );
      res.status(200).json({ error: false, user: data });   
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = {
   register_withdraw,
   updateWithdraw
}