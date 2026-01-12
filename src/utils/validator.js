const validator = require('validator');

const validateSignUp= (req)=>{

    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name should not be blank");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Enter a valid email-id")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a valid password")
    }
};

module.exports = {validateSignUp}