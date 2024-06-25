const express = require("express");

const router = express.Router();

const messageController = require("../controllers/message.controller");
const protectRoute = require("../middlewares/protectRoute.middleware");

router.get("/:id", protectRoute, messageController.getMessages);
router.post("/send/:id", protectRoute,messageController.sendMessage);

module.exports = router;