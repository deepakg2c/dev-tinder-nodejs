const express = require("express")
const authRoute = express.Router();


const User = require("../models/user")
const { validateSignUp } = require('../utils/validator')
const bcrypt = require('bcrypt');
const auth = require("../middlewares/auth");

authRoute.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        console.log(emailId);

        const user = await User.findOne({ emailId });

        console.log(user);

        if (!user) {
            return res.status(400).json({ message: "Email id not valid" });
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token);

            res.send("Login Successfull")

        } else {
            throw new Error("Invalid Credentials")
        }


    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
});
authRoute.post("/signup", async (req, res) => {

    try {
        validateSignUp(req);

        const { firstName, lastName, emailId, password, age, phoneNumber } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            age,
            phoneNumber
        })
        await user.save();
        res.send("data saved successfully");
    } catch (err) {
        res.status(400).send(" Error : " + err.message)
    }



})

authRoute.post("/logout", auth, async (req, res) => {
    try {
        const user = req.user;
        const token = await user.getJWT();
        res.clearCookie("token", token);
        res.send("You have logged out successfully..")
    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})

module.exports = authRoute;