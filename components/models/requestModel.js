'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Request = new Schema({
  id_user: {
    type: String
  },
  json:{
    type: JSON
  },
  status: {
    type: Boolean
  }},
  {
      timestamps: true,
      collection: 'requests'
  }
);

module.exports = mongoose.model('Request', Request;);