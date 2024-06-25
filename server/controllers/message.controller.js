const { isObjectIdOrHexString } = require("mongoose");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const socket = require("../socket/socket");

const getMessages = async (req, res) => {
    try {
        const { id } = req.params;

        const userToChat = id; //receiver

        const senderId = req.user._id; //sender

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChat] }
        }).populate("messages"); // NOT IDs BUT ACTUAL MESSAGES

        if (!conversation) return res.status(200).json([]);

        res.status(201).json(conversation.messages);
    }
    catch (error) {
        console.log("Error in sendMessage controller " + error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const sendMessage = async (req, res) => {
    try {

        const { id } = req.params;
        const { message } = req.body;

        const receiverId = id;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }


        await conversation.save();
        await newMessage.save();

        //SOCKET IO FUNCTIONALITY
        const receiverSocketId = socket.getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // io.to(<socketId>).emit() is used to emit events to a specific client
            socket.io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in sendMessage controller " + error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { sendMessage, getMessages };