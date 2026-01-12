const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Id " + value);
            }
        }
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "{VALUE} is not a valid gender",
        },
    },
    skills: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.length === new Set(value).size;
            },
            message: "Skills must be unique",
        },
    }
}, { timestamps: true });

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Deepak@4321&123", {
        expiresIn: "7d",
    });
    return token;

}

userSchema.methods.validatePassword = async function (passwordByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordByUser, passwordHash);

    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);