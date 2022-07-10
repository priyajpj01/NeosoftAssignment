const express=require('express')
const router=express.Router()
const {scopedUser,registerOptions} = require('../permissions')


// Load User model
const User = require("../models/user");

// @route   GET api/get/registerOptions
// @desc    Fetch roles one can create user for
// @access  Public
//{owner:"xxx"}
router.get('/get/registerOptions',(req,res)=>
{
    res.json(registerOptions(req.body.owner))

})

// @route   GET api/get/userID
// @desc    Fetch users on the basis of specific userID
// @access  Public
// JSON : {role:'procurement manager'}
router.get('/:userID',setUserID, async(req, res) => {
    const _id = req.params.userID
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
router.get('/get/users', async (req, res) => {
    res.send(scopedUser(req.body.role))
    })  

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