'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EnterpriseModel = new Schema({
  nameEnterprise: {
    type: String
  },
  email: {
    type: String
  },
  senha: {
    type: String
  }},
  {
      timestamps: true,
      collection: 'enterprises'
  }
);

module.exports = mongoose.model('Enterprise', EnterpriseModel);