'use strict';
const mongoose = require('mongoose'),
    Request = mongoose.model('Request');


function createUser(req, res) {

    let newEnterprise = new Enterprise(req.body);
    newEnterprise.senha = md5(newEnterprise.senha);
    Enterprise.findOne({
        'email': newEnterprise.email.toString()
    }, function (err, enterprise) {
        if (err) {
            res.json({
                "status": "error",
                "data": {},
                "message": "erro inesperado"
            });
        } else {
            if (enterprise) {
                res.json({
                    "status": "error",
                    "data": {},
                    "message": "Email já cadastrado"
                });
            } else {
                newEnterprise.save(function (err, enterprise) {
                    if (err) {
                        res.json({
                            "status": "error",
                            "data": {},
                            "message": "erro inesperado"
                        });
                    } else {
                        res.json({
                            "status": "success",
                            "data": enterprise,
                            "message": "Usuário cadastrado com sucesso"
                        });
                    }
                });
            }
        }
    });
};

function upload(req, res){
    if (err) {
        return res.end(err.toString());
    }

    res.end('File is uploaded');
}
module.exports = {
    upload: upload
};