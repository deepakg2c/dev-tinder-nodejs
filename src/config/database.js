const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://deepakmishra2141_db_user:Deepak2141@devtinderproject.eejg7vw.mongodb.net/devTinder")

}

module.exports = connectDB;


