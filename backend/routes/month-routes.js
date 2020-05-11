const express = require('express');
const monthControllers = require('../controllers/monthController');

const router = express.Router();

router.get('/getmonths', monthControllers.getMonths);

router.post('/addmonth', monthControllers.addMonth);

router.post('/changeamounts', monthControllers.changeAmounts);

router.post('/addamounts', monthControllers.addAmounts);

module.exports = router;
