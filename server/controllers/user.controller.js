const User = require("../models/user.model");

const getUsersForSidebar = async(req,res) => {
    try{

        const loggedInUserId = req.user._id // req.user is set in protectRoute middleware

        const allUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); //Return all users except the loggedInUser

        res.status(200).json(allUsers);

    }
    catch(error){
        console.log("Error in getUsersForSidebar middleware "+ error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = getUsersForSidebar;