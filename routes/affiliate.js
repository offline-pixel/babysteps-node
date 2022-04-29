const express = require('express');
const {
  amazon, uploadUserInvoices, getUserInvoices
} = require('../controllers/affiliate');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router
  .get('/amazon', amazon)
  .get('/userinvoices', protect, getUserInvoices)
  .post('/userinvoices', protect, uploadUserInvoices)

module.exports = router;