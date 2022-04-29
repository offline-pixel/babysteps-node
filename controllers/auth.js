const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const device = require('../utils/device');

// @desc      Register User
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
    const { _ip, _ua, _device } = await device.detect(req)
    const { firstName, lastName, email, password, upi, role } = req.body
    const user = await User.create({
        firstName, lastName, email, password, upi, role, _ip, _ua, _device
    })
    sendTokenResponse(user, 200, res, 'register', 'v1')
});

// @desc      login User
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    if ( !email && !password ) {
        return next(new ErrorResponse("Please provide a valid email and password", 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if ( !user ) {
        return next(new ErrorResponse("Invalid credentials", 401))
    }
    const isMatch = await user.matchPassword(password)
    if ( !isMatch ) {
        return next(new ErrorResponse("Invalid credentials", 401))
    }
    sendTokenResponse(user, 200, res, 'login', 'v1')
});

// @desc      Profile
// @route     POST /api/v1/auth/profile
// @access    Private
exports.profile = asyncHandler(async (req, res, next) => {
    // user is already available in req due to the protect middleware
    // const user = req.user;
    const user = await User.findById(req.user.id).select('-__v').select('-createdAt')
    // this will work only if token is sent
    sendTokenResponse(user, 200, res, 'profle', 'v1')
});

// @desc      Update Profile
// @route     POST /api/v1/auth/updateProfile
// @access    Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const fields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id, fields, {
        new: true,
        runValidators: true
    })
    sendTokenResponse(user, 200, res, 'updateProfile', 'v1')
});


// @desc      Update password
// @route     PUT /api/v1/auth/updatePassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
  
    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return next(new ErrorResponse('Password is incorrect', 401));
    }
  
    user.password = req.body.newPassword;
    await user.save();
  
    sendTokenResponse(user, 200, res, 'updatePassword', 'v1');
});

// @desc      logout User
// @route     POST /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
    sendTokenResponse(user, 200, res, 'logout', 'v1')
});

// @desc      forgot User
// @route     POST /api/v1/auth/forgotPassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email})
    if ( !user ) {
        return next(new ErrorResponse("Email Not found. Please try again", 401))
    }
    const resetToken = user.getResetPasswordToken()
    console.log(resetToken)
    await user.save({ validateBeforeSave: false })
    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message,
        });
        res.status(200).json({
            a:'forgotPassword', v:'v1', s: 1, l: undefined,
            n: undefined,
            f: resetToken,
            d: undefined,
            r: resetToken
        });
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse('Email could not be sent', 500));
    }
});

// @desc      Reset User
// @route     POST /api/v1/auth/resetPassword
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // Hash token and set to resetPasswordToken field
    // console.log(req.params)
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res, 'resetPassword', 'v1');
});


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, a, v) => {
    const token = user.getSignedJwtToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: false
    };
  
    if ( process.env.NODE_ENV === 'production' ) {
      options.secure = true;
    }
  
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            a, v, s: 1, l: user.length,
            n: '',
            f: user,
            d: user,
            t: token
        });
};