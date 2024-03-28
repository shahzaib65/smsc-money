const mongoose = require("mongoose");
const withdrawSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    amount: {
        type: String
    },
    email: {
        type: String
    },
    payment_status: {
        type: String,
        default: "pending"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Withdraw",withdrawSchema)