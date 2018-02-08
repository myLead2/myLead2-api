'use strict';
const path = require('path');

const fs = require('fs');
const mongoose = require('mongoose'),
    Request = mongoose.model('Request');

const DIR = 'public/uploads/'

function upload(req, res) {
    let tmp_path = req.file.path;

    let id_user = req.url.split('?')[1].split('=')[1];
    let target_path = DIR + req.file.originalname + '__' + Date.now();

    let src = fs.createReadStream(tmp_path);
    let dest = fs.createWriteStream(target_path);
    let url_file = path.join(__dirname, target_path);

    let newRequest = new Request({
        'id_user': id_user,
        'url_file': url_file,
        'status': false
    });

    newRequest.save();

    src.pipe(dest);
    src.on('end', function () {
        res.json({
            'status': 'sucess',
            'url_file': url_file
        });
    });
    src.on('error', function (err) {
        res.send('error');
    });
};



module.exports = {
    upload: upload
};