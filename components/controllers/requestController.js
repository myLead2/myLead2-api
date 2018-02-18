'use strict';
const csv = require('csvtojson')
const needle = require('needle');
const fs = require('fs');
const mailer = require('./../../mailer/mailer');
const mongoose = require('mongoose'),
    Request = mongoose.model('Request'),
    Enterprise = mongoose.model('Enterprise');

const URL_API_ML = 'http://127.0.0.1:5000/data/cleaning';

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

    newRequest.save().then(function (res) {
        console.log('Enviando para análise...');
        needle.request('post', URL_API_ML+ '?id_user=' + id_user, res, {
            json: true
        }, function (err, resp) {
            if (!err) {
               console.log('Esperando resposta...')
            }
            if (err) {
                console.log('neddle error');
            }
        })

    });

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
                'status': 'success',
                'result': result
            });
        }
    });

}

module.exports = {
    upload: upload,
    getData: getData
};