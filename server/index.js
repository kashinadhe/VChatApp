const express = require('express');
const cors = require("cors");
// const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.route");
const userRoutes = require("./routes/user.route");

const connectToMongoDB = require("./db/connectMongoDB");
const cookieParser = require("cookie-parser");
const path = require("path");

const socketIo = require("./socket/socket");

require("dotenv").config();

const port = process.env.PORT || 5000;

__dirname = path.resolve();

const uri = String(process.env.ATLAS_URI);

socketIo.app.use(express.json());
socketIo.app.use(cors());
socketIo.app.use(cookieParser());
socketIo.app.use("/api/auth", authRoutes);
socketIo.app.use("/api/messages", messageRoutes);
socketIo.app.use("/api/users", userRoutes);

socketIo.app.use(express.static(path.join(__dirname, "/client2/dist")));

socketIo.app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client2", "dist", "index.html"));
});

socketIo.server.listen(port, async (req, res) => {
    //MongoDB connection
    await connectToMongoDB();
    console.log("Server running on port: " + port);
    console.log(uri);
});


