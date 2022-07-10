const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const { canRegisterUser} = require('../permissions')

// Load Input Validation
const validateRegisterInput = require("../validate");
const validateLoginInput = require("../validate");


// Load User model
const User = require("../models/user");
router.post('/register',authRegisterUser,async (req,res)=>
{
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
        // const token =  user.generateAuthToken()
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

function authRegisterUser(req,res,next)
{
    console.log("Inside auth")
    if (!canRegisterUser(req.body.owner)) {
        res.status(401)
        return res.send(req.body.owner+' not Allowed to create user')
      }
    
      next()

}
module.exports = router;