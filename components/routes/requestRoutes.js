const express = require('express');
const router = express.Router();
const request = require('../controllers/requestController');
const multer = require('multer');
const DIR = 'public/uploads/'
const upload = multer({ dest: DIR });

/* GET users listing. */
router.post('/api/upload', upload.single('csvsendfile'), request.upload);
module.exports = router;
