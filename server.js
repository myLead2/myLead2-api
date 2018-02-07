const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const enterpriseModel = require('./components/models/enterpriseModel');
const enterpriseRoutets = require('./components/routes/enterpriseRoutes');
//const multer = require('multer');
const cors = require('cors')

const app = express();

//UPLOAD
//let DIR = './uploads/';
//let upload = multer({dest: DIR});


//CORS V02
app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mylead_mongo:mylead_mongo@ds127436.mlab.com:27436/heroku_mmlfwqpn'); 


// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
 
// app.set(multer({
//   dest: DIR,
//   rename: function (fieldname, filename) {
//     return filename + Date.now();
//   },
//   onFileUploadStart: function (file) {
//     console.log(file.originalname + ' is starting ...');
//   },
//   onFileUploadComplete: function (file) {
//     console.log(file.fieldname + ' uploaded to  ' + file.path);
//   }
// }).single('singleInputFileName'));



var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.post('/api/upload', function (req, res) {
  console.log(req.body);
  return true;
});

app.use(cookieParser());

app.use('/', enterpriseRoutets);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

