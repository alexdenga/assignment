const express = require('express');
const router = express.Router();

const Access = require('../middleware/access');
// controllers
const IntegerController = require('../controllers/integer');
// COUNTRIES
/////////////////////////
router.post('/integer', Access, IntegerController.getInteger);

module.exports = router;