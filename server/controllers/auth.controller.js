const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");

const login = async (req, res) =>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) return res.status(400).json({error: "Incorrect username or password"});

        generateTokenAndSetCookie(user._id, res); //generate JWT

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    }
    catch(error){
        console.log("Error in login controller "+ error);
        res.status(500).json({error: "Internal server error"});
    }
}

const signup = async (req, res) =>{

    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword) return res.status(400).json({error: "Passwords don't match"});

        const user = await User.findOne({username});

        if(user) return res.status(400).json({error: "Username already exists"});

        //Password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar.iran.liara.run/public/boy?username=Scott
        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? maleProfilePic : girlProfilePic
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else{
            return res.status(400).json({error: "Invalid user data"});
        }
    }
    catch(error){
        console.log("Error in signup controller "+ error);
        res.status(500).json({error: "Internal server error"});
    }
}

const logout = async (req, res) =>{
    try{
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    }
    catch(error){
        console.log("Error in logout controller "+ error);
        res.status(500).json({error: "Internal server error"});
    }

}

module.exports = {login, signup, logout};