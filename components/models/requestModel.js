'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RequestModel = new Schema({
  id_user: {
    type: String
  },
  url_file:{
    type: String
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