var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Route handlers
var homeRouter = require('./routes/home');
var tripsRouter = require('./routes/trip');
var authRouter = require('./routes/auth');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); //  ejs renders html views
app.set('view engine', 'html');


// routes
app.use('/', homeRouter);   // toda peticion (desde el front) q empiece por / lo envia a indexRouter
app.use('/auth', authRouter);

// protected routes
app.use('/mytrips', tripsRouter);


//  Middlewares - error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  console.log('Error!', err);
  res.render('error');
});


module.exports = app;
