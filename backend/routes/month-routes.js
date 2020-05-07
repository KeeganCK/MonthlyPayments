const express = require('express');
const monthControllers = require('../controllers/monthController');

const router = express.Router();

router.get('/getMonths', monthControllers.getMonths);

module.exports = router;
