const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const accountSchema = mongoose.Schema(
    {
        smid: {
            type: String,
            unique: true,
            required: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

//static method for creating new account
accountSchema.statics.signup = async function (smid, email, username, password) {

    const exists = await this.findOne({ smid })

    if (exists) {
        throw Error("Account already exists")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }


    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const useraccount = await this.create({ smid, email, username, password: hash })

    return useraccount
}

//static login method
accountSchema.statics.login = async function (username, password) {
    //find and save user data to user constant
    const user = await this.findOne({ username })

    if (!user) {
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

// Static method to encrypt password
accountSchema.statics.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword;
}

//static method to check if email is valid
accountSchema.statics.validateEmail = async function (email) {
    return validator.isEmail(email)
}

module.exports = mongoose.model('account', accountSchema);

