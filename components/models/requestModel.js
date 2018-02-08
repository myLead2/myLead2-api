'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RequestModel = new Schema({
  id_user: {
    type: String
  },
  json_file:{
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

module.exports = mongoose.model('Request', RequestModel);