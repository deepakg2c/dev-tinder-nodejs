const express = require("express");
const connectDB = require("./config/database")
const app = express();
const cookiesParser = require("cookie-parser")
const authRoute = require("./route/auth")
const authProfile = require("./route/profile")


app.use(express.json());
app.use(cookiesParser());

app.use("/", authProfile);
app.use("/", authRoute);



connectDB().then(() => {
    console.log("database connected")
    app.listen(7777, () => {
        console.log("🚀 Server running on port 1234");
    });
}).catch(err => {
    console.log("database not connected")
});










