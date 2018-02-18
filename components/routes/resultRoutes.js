const express = require('express');
const router = express.Router();
const result = require('../controllers/resultController');

/* GET users listing. */
router.post('/api/result/result',  result.getResult);
router.post('/api/result/data', result.getData);
router.post('/api/result/save/', result.saveResult);


module.exports = router;
