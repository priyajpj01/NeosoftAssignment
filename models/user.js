const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')


var validateField = function(variable) {
    var re = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/;
    return re.test(variable)
};
//create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userID: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: [validateField, 'Please fill a valid email address or phone number']
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    role: {
        type: String,
        required: true

    },
    assignedTo: {
        type: String
    },
    owner: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

});


UserSchema.statics.findByCredentials = async (userID, password) => {
    const user = await User.findOne({
        userID
    })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// Hash the plain text password before saving
UserSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})



module.exports = User = mongoose.model("User", UserSchema);