const express = require("express");
const profileRoute = express.Router();

const auth = require("../middlewares/auth")

profileRoute.get("/profile", auth, async (req, res) => {

    try {
        const user = req.user;
        console.log("user " + user);
        res.send(user);

    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
});


profileRoute.get("/user", async (req, res) => {

    const emailId = req.body.emailId;

    const users = await User.findOne({ emailId: emailId });

    res.send(users);


});

profileRoute.get("/allUsers", async (req, res) => {

    try {
        const allUsers = await User.find({})
        if (allUsers.length > 0) {
            res.send(allUsers);
        } else {
            res.status(400).send({ message: "user not found" })
        }

    } catch (err) {
        res.status(400).send("Something went wrong" + err.message);
    }
})

profileRoute.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong" + err.message);
    }
})

profileRoute.put("/user", async (req, res) => {

    const userId = req.body._id;
    const data = req.body;

    console.log(userId);
    console.log(data);

    try {
        await User.findByIdAndUpdate({ _id: userId }, data);
        const user = await User.findOne({ _id: userId });
        res.send(user);

    } catch (err) {
        res.status(400).send("Something went wrong" + err.message);
    }

});


profileRoute.patch("/user/:userId", async (req, res) => {

    const userId = req.params?.userId;

    console.log(userId);
    const data = req.body;
    try {
        const ALLOWED_UPDATED = ["age", "skills", "lastName"];
        const isUpdatedAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATED.includes(k));
        if (!isUpdatedAllowed) {
            throw new Error("Update not allowed");
        }
        const updatedData = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "after", runValidators: true });
        //res.send(updatedData);
        console.log("User updated")
        res.send(updatedData);

    } catch (err) {
        res.status(400).send("Something went wrong" + err.message);
    }

});

module.exports = profileRoute;