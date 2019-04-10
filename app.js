var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require("config");
const redis = require('redis')
  , subscriber = redis.createClient(config.redis.port, config.redis.ip);

function addSubscribe(fn) {
  subscriber.on(fn, function(channel, message) {
    console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
  });
}

addSubscribe('onConfiguration');
addSubscribe('onBalanceInit');
addSubscribe('onBalance');
addSubscribe('onProp');
addSubscribe('onTradeMeet');
addSubscribe('onBetBid');
addSubscribe('onBetAsk');
addSubscribe('onBetCancelBid');
addSubscribe('onBetCancelAsk');
  
// const RedisServer = require('redis-server');
// const server = new RedisServer(3212);

// server.open((err) => {
//   if (err === null) {
    
//   }
// });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coinsRouter = require('./routes/coins');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/coins', coinsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
