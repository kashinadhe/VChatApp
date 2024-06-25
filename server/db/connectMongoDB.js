const mongoose = require("mongoose");

const connectToMongoDB = async () => {
    const uri = process.env.ATLAS_URI;
    try{
        
        await mongoose.connect(uri);
        console.log("MongoDB Connection successfull");
    }
    catch(error){
        console.log("MongoDB connection failed "+ error.message);
    }
}

module.exports = connectToMongoDB;

// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB Connection successfull"))
// .catch((error) => console.log("MongoDB connection failed "+ error.message));