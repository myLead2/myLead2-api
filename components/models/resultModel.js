'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ResultModel = new Schema({
  id_user: {
    type: String
  },
  result: {
    type: JSON
  },
  status: {
    type: Boolean
  }
}, {
  timestamps: true,
  collection: 'results'
});

module.exports = mongoose.model('Result', ResultModel);