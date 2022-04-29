const express = require('express');
const {
  engineer, medical, mba, law
} = require('../controllers/college');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/engineer', protect, engineer);
router.get('/medical', protect, medical);
router.get('/mba', protect, mba);
router.get('/law', law);

module.exports = router;