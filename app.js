//import express vào app 
require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('./config/passport')
var User = require('./Models/User')

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(session({
  secret: 'adsa897adsa98bs',
  resave: false,
  saveUninitialized: false,
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// kết nối Database MongoDB
 mongoose.connect(process.env.DB_CONN, {
// mongoose.connect('mongodb://localhost:27017/update', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function() {
  console.log('Successfully connected to the database');
}).catch(function(err) {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit()
})


// //pug
app.set('views',path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use(usersRouter);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


const script = require('./script')

app.listen(process.env.PORT || 3000, () => {
  script.task.start()
})

module.exports = app



