'use strict';
const csv = require('csvtojson')
const fs = require('fs');
const mongoose = require('mongoose'),
    Request = mongoose.model('Request');


function upload(req, res) {
    let id_user = req.url.split('?')[1].split('=')[1];
    let file = req.file.buffer.toString();

    //console.log(file);
    let data = [];

    csv({ flatKeys: true })
        .fromString(file)
        .on('json', (jsonObj) => {
            data.push(jsonObj);
        })
        .on('done', (error) => {
            console.log(error);
        })

    let newRequest = new Request({
        'id_user': id_user,
        'json_file': { 'data': data },
        'status': false
    });

    newRequest.save();

    res.json({
        'status': 'sucess',
        'json_file_id': newRequest._id
    });


    //let src = fs.createReadStream(tmp_path);
    //let dest = fs.createWriteStream(target_path);

    // src.pipe(dest);
    // src.on('end', function () {

    // });
    // src.on('error', function (err) {
    //     res.send('error');
    // });
};



module.exports = {
    upload: upload
};