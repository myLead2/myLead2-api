'use strict';

const mongoose = require('mongoose'),
  Enterprise = mongoose.model('Enterprise');


function createUser(req, res) {

  let newEnterprise = new Enterprise(req.body);
  Enterprise.findOne({
    'email': req.body.email.toString()
  }, function (err, enterprise) {
    if (err) {
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
    } else {
      res.json({
        "status": "error",
        "data": {},
        "message": "email já cadastrado na base de dados"
      });
    }
  });

};


function getSingleUser(req, res) {
  console.log(req.params.email_usuario);
  Enterprise.findOne({
    'email': req.params.email.toString()
  }, function (err, enterprise) {
    if (err) {
      res.json({
        "status": "error",
        "data": {},
        "message": "email já cadastrado na base de dados"
      });
    } else {
      res.json({
        "status": "success",
        "data": enterprise,
        "message": "Usuario encontrado com sucesso"
      });
    }
  });
};

module.exports = {
  getSingleUser: getSingleUser,
  createUser: createUser,
  // login: login,
};