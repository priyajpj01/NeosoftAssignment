const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const { canRegisterUser} = require('../middleware/permissions')

// Load Input Validation
const validateRegisterInput = require("../src/validate");



// Load User model
const User = require("../models/user");

// @route   POST /register
// @desc    Register user
// @access  Public
//{
// "userID":"xx",
// "password":"xx",
// "role":"xx",
// "name":"xx",
// "owner":"xx"
// }
router.post('/register',authRegisterUser,async (req,res)=>
{
const response= validateRegisterInput.registerValidation(req.body);
    //check Validation
    if(response.error)
    {
    
        return res.status(400).json(response.error.details[0]['message'])
    
    }    
const userID=req.body.userID
const password=req.body.password
const role=req.body.role
const name=req.body.name
const owner=req.body.owner

await User.findOne({ userID }).then((user) => {
    // Check for user
    if (!user) {  
        console.log("User not found!!")
        const user = new User({userID,password,role,name,owner});
        user.save()
        res.status(201).send({ user})
          }
    else
    {
     if(owner=='procurement manager')
     {
      return res.status(400).send({error: 'inspection manager already exists, please contact admin'})
     }
     else
     {
        return res.status(400).send({error: 'Already registered, please login'})
 
     }


    }

})

})

// function to access middleware
function authRegisterUser(req,res,next)
{
    if (!canRegisterUser(req.body.owner)) {
        res.status(401)
        return res.send(req.body.owner+' not Allowed to create user')
      }
    
      next()

}
module.exports = router;