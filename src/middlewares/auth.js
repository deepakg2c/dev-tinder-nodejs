const jwt = require('jsonwebtoken');
const User = require("../models/user")

const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token is expired!!!!!!!");
        }
        const decodedObj = await jwt.verify(token, "Deepak@4321&123");
        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User is not found");
        }
        console.log(user);
        req.user = user;
        next();

    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }


}

module.exports = auth;
