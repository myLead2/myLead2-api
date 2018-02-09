const express = require('express');
const router = express.Router();
const request = require('../controllers/requestController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

/* GET users listing. */
router.post('/api/upload', upload.single('csvsendfile'), request.upload);
router.post('/api/request/data/', request.getData);
module.exports = router;
