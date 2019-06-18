'use strict';

const express = require('express');
const config = require('./config');
const app = express();

//add modules
const path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
//app.use(express.static(path.join(__dirname, 'public')));

//path for admin asset files
app.use(express.static(path.join(__dirname, '/views/admin')));

//All view directories here
//Example: When in the /admin directory, require the route file that handles the /admin directory
app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin.js'));
app.use('/my_account', require('./routes/my_account.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send('404 page not found');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
