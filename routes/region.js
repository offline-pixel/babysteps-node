const express = require('express');
const {
  states,
  countries
} = require('../controllers/region');

const router = express.Router();

// const { protect } = require('../middleware/auth');

router.get('/states', states);
router.get('/countries', countries);

module.exports = router;