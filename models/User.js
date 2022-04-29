const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomize = require('randomatic');
const geoip = require('geoip-lite');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
        ],
    },
    role: {
        type: String,
        enum: ['boss', 'superAdmin, visualized - all region', 'admin visualized sales - all region', 'countryHead', 'stateHead', 'approver', 'user'],
        default: 'user',
        select: false,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 8,
        select: false,
    },
    upi: {
        type: String,
        required: [true, 'Please add an UPI address to receive cashback'],
        select: false,
    },
    urlShort: {
        type: String,
    },
    _ip: {
        type: String,
        select: false,
    },
    _ua: {
        type: String,
        select: false,
    },
    _device: {
        type: Object,
        select: false,
    },
    _geo: {
        type: Object
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // confirmEmailToken: String,
    // isEmailConfirmed: {
    //     type: Boolean,
    //     default: false,
    // },
    // twoFactorCode: String,
    // twoFactorCodeExpire: Date,
    // twoFactorEnable: {
    //     type: Boolean,
    //     default: false,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
});

// Encrypt password using bcrypt
// bCrypt uses blowfish and we need implementations like EC256 with p256 curves, aes 256 etc
// top of that, we have to track user's last activity and its session to mitigate the possiblity of hacking
// Is there any simple way?
// We can make a check and always sends a new code to existing user's device to allow or block
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { // || !this.isModified('upi')
      next();
    }
    this._geo = await geoip.lookup('172.20.10.2');
    console.log(this._geo)
    this.urlShort = this.email;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // this.upi = await bcrypt.hash(this.upi, salt);
});

// UserSchema.pre('save', async function (next) {
//     this.urlLong = this.email;
//     this.urlShort = this.email;
// });


// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    console.log(this._id)
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
  
// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
  
    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    // Set expire
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  
    return resetToken;
  };
  
// // Generate email confirm token
// UserSchema.methods.generateEmailConfirmToken = function (next) {
//     // email confirmation token
//     const confirmationToken = crypto.randomBytes(20).toString('hex');

//     this.confirmEmailToken = crypto
//         .createHash('sha256')
//         .update(confirmationToken)
//         .digest('hex');

//     const confirmTokenExtend = crypto.randomBytes(100).toString('hex');
//     const confirmTokenCombined = `${confirmationToken}.${confirmTokenExtend}`;
//     return confirmTokenCombined;
// };
  
module.exports = mongoose.model('User', UserSchema);