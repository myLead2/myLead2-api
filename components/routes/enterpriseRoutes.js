const express = require('express');
const router = express.Router();
const enterprise = require('../controllers/enterpriseController');

/* GET users listing. */
router.get('/api/enterprise/:email', enterprise.getSingleUser);
// router.post('/api/enterprise/login/', enterprise.login);
router.post('/api/enterprise', enterprise.createUser);

module.exports = router;
