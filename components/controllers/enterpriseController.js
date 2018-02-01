'use strict';

const mongoose = require('mongoose'),
  Enterprise = mongoose.model('Enterprise');


function createUser(req, res) {

  let newEnterprise = new Enterprise(req.body);

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
      if(enterprise){
        res.json({
          "status": "error",
          "data": {},
          "message": "Email já cadastrado"
        });
      }else{
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


function getSingleUser(req, res) {
  Enterprise.findOne({
    'email': req.params.email.toString()
  }, function (err, enterprise) {
    if (err) {
      res.json({
        "status": "error",
        "data": {},
        "message": "erro inesperado"
      });
    } else {
      if(enterprise){
        res.json({
          "status": "success",
          "data": enterprise,
          "message": "Usuario encontrado com sucesso"
        });
      }else{
        res.json({
          "status": "error",
          "data": {},
          "message": "Usuario não encontrado"
        });
      }
      
    }
  });
};

module.exports = {
  getSingleUser: getSingleUser,
  createUser: createUser,
  // login: login,
};