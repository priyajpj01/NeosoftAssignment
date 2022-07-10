const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt = require("bcryptjs");


// Load Input Validation
const validateRegisterInput = require("../validate");
const validateLoginInput = require("../validate");


// Load User model
const User = require("../models/user");

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
//{"userID":"XXX","password":"xxx"}

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.userID, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router;