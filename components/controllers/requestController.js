'use strict';
const csv = require('csvtojson')
const fs = require('fs');
const mailer = require('./../../mailer/mailer');
const mongoose = require('mongoose'),
    Request = mongoose.model('Request'),
    Enterprise = mongoose.model('Enterprise');


function upload(req, res) {
    let id_user = req.url.split('?')[1].split('=')[1];

    let file = req.file.buffer.toString();

    //console.log(file);
    let data = [];

    csv({
            flatKeys: true
        })
        .fromString(file)
        .on('json', (jsonObj) => {
            data.push(jsonObj);
        })
        .on('done', (error) => {
            console.log(error);
        })

    let newRequest = new Request({
        'id_user': id_user,
        'json_file': {
            'data': data
        },
        'status': false
    });

    newRequest.save();

    Enterprise.findById(id_user, function (err, enterprise) {
        if (enterprise) {
            mailer.notificationUpload(enterprise.nameEnterprise, enterprise.email);
        }
    })


    res.json({
        'status': 'sucess',
        'json_file_id': newRequest._id
    });
};

function getData(req, res, next) {
    Request.aggregate([{
        $group: {
            '_id': req.body.id,
            'count': {
                '$sum': 1
            }
        }
    }], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json({
                'result': result
            });
        }
    });

}

module.exports = {
    upload: upload,
    getData: getData
};