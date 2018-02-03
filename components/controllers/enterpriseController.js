'use strict';
const md5 = require('md5');
const mongoose = require('mongoose'),
  Enterprise = mongoose.model('Enterprise');


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

function login(req, res) {
    
    Enterprise.findOne({
      'email': req.body.email.toString(),
      'senha': md5(req.body.senha)
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
            "data": {"name": enterprise.name, "email":enterprise.email,"id":enterprise._id},
            "message": "Usuário logado com sucesso"
          });
        }else{
          res.json({
            "status": "error",
            "data": {},
            "message": "Usuário não encontrado"
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
  login: login,
};