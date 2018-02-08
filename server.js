const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const enterpriseModel = require('./components/models/enterpriseModel');
const enterpriseRoutets = require('./components/routes/enterpriseRoutes');
const multer = require('multer');
const cors = require('cors')
const fs = require('fs');

const app = express();

//UPLOAD
let DIR = 'public/uploads/'
let upload = multer({ dest: DIR });
app.use(express.static(path.join(__dirname, './public')));


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

app.post('/api/upload', upload.single('csvsendfile'), function (req, res, next) {
  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  var tmp_path = req.file.path;

  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path = DIR + req.file.originalname + '__' + Date.now();

  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  
  src.pipe(dest);
  src.on('end', function () { res.json({'status': 'sucess', 'url_file': path.join(__dirname,target_path)}); });
  src.on('error', function (err) { res.send('error'); });
});

app.use('/', enterpriseRoutets);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

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

