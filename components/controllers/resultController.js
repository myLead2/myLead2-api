'use strict';
const csv = require('csvtojson');
const _ = require('lodash');
const needle = require('needle');
const mailer = require('./../../mailer/mailer');
const mongoose = require('mongoose'),
    Result = mongoose.model('Result'),
    Enterprise = mongoose.model('Enterprise');

function getData(req, res, next) {
    Result.aggregate([{
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

function saveResult(req, res, next) {
    console.log('Salvando...');
    let id_user = req.url.split('?')[1].split('=')[1];  
 
    let data = cleannerResult(req.body);

    let result = new Result({
        'id_user': id_user,
        'result': data,
        'status': true
    });

    result.save()

    console.log('Salvo');
    

    Enterprise.findById(id_user, function (err, enterprise) {
        if (enterprise) {
            mailer.notificationAnalityc(enterprise.nameEnterprise, enterprise.email);
        }
    })

    console.log('Email enviado');
    
}

function getResult(req, res, next) {

    Result.find({'id_user':req.body.id_user}, function (err, result) {
       if(result){
           console.log(result);
           res.json({
               'status': 'success',
               'data': result
           })
       }
    })
}

function cleannerResult(result) {
    let data = result.result;
    let resultCleanner = [];

    data.forEach(element => {
        if(element[2].split(':')[1] >= 0.8){
            resultCleanner.push({
                'email': element[0].split(':')[1],
                'name': element[1].split(':')[1],
                'result': element[2].split(':')[1]
            });
        }
    });

    return resultCleanner;

}

module.exports = {
    saveResult: saveResult,
    getData: getData,
    getResult: getResult
};