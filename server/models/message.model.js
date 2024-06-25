const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    message:{
        type: String,
        required: true
    }

   // createdAt, updateAt 
},{timestamps: true});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;