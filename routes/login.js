const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt = require("bcryptjs");


// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");


// Load User model
const User = require("../../models/User");

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public

router.post('/login/:role',(req,res)=>
{

if(req.params.role=='admin'||req.params.role=='client',req.params.role=='pm')
{
  const {errors,isValid}=validateLoginInput(req.body)
}  
else
{
  const {errors,isValid}=validateLoginInput1(req.body)
}


//check Validation
if(!isValid)
{

    return res.status(400).json(errors)

}
const email=req.body.email
const password=req.body.password

User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name }; // Create JWT Payload
  
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });

})




})
