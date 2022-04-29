const express = require('express');
const {
  register, profile, login, logout, forgotPassword, resetPassword, updateProfile, updatePassword
} = require('../controllers/auth');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router
  .post('/register', register)
  .post('/login', login)
  .get('/profile', protect, profile)
  .post('/updateProfile', protect, authorize('user'), updateProfile)
  .post('/logout', logout)
  .post('/forgotpassword', forgotPassword)
  .post('/reset/:resetToken', resetPassword)
  .post('/updatepassword', updatePassword)

module.exports = router;