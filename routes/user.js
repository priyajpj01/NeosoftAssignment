const express=require('express')
const router=express.Router()
const {scopedUser,registerOptions} = require('../middleware/permissions')
const auth = require('../middleware/auth')


// Load User model
const User = require("../models/user");

// Load Input Validation
const validateLoginInput = require("../src/validate");

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
//{"userID":"XXX","password":"xxx"}

router.post('/users/login', async (req, res) => {
const response= validateLoginInput.loginValidation(req.body);
//check Validation
if(response.error)
{

    return res.status(400).json(response.error.details[0]['message'])

}
    try {
        const user = await User.findByCredentials(req.body.userID, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})



// @route   GET api/get/userID
// @desc    Fetch users on the basis of specific userID
// @access  Public
// JSON : {userID:'xxx',owner:'xxx'}
router.get('/users/me',setUserID,async(req, res) => {
    const _id = req.body.userID
    try {
        const user = await User.findOne({ userID:_id, owner: req.body.owner})

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
  })



// @route   GET api/users
// @desc    Fetch users created by a specific role
// @access  Public
// JSON : {role:'procurement manager'}
// auth
router.get('/users',auth,async (req, res) => {
    var filter=scopedUser(req.body.role)
    try {
        await User.findOne(filter).then((user)=>
        {
        if (!user) {
            return res.status(404).send()
        }
         res.send(user)
    }
        )
}catch (e) {
  }
    })  



// @route   GET api/get/registerOptions
// @desc    Fetch roles one can create user for
// @access  Public
//{owner:"xxx"}
router.get('/get/registerOptions',(req,res)=>
{
    res.json(registerOptions(req.body.owner))

})    


// middleware to find if user exists in db
function setUserID(req, res, next) {
        const userID = parseInt(req.params.userID)
        req.user = User.find({userID:userID})
        if (req.user == null) {
          res.status(404)
          return res.send('User not found')
        }
        next()
      }
      module.exports = router;