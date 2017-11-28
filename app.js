const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const session      = require('express-session');
const passport     = require('passport');

require("dotenv").config();
require("./config/mongoose-setup");
require("./config/passport-setup");
const mySessionStore = require("./config/store-setup.js");


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'ShiftHappens';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use(
  session({
    resave: true,
    saveUnintialized: true,
    secret: "avoid errors",
    store: mySessionStore
  })
);
app.use(passport.initialize());
app.use(passport.session());

// custom middleware

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// routes

const index = require('./routes/index');
app.use('/', index);

const myUserRouter = require('./routes/user-router');
app.use(myUserRouter);

const myAdminRouter = require('./routes/admin-router');
app.use(myAdminRouter);

const myChatRouter = require('./routes/chat-router');
app.use(myChatRouter);

const myMatchRouter = require('./routes/match-router');
app.use(myMatchRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
