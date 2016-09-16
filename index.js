// at the very top, require express-session
var session = require('express-session');

/*
 * setup the session with the following:
 *
 * secret: A string used to "sign" the session ID cookie, which makes it unique
 * from application to application. We'll hide this in the environment
 *
 * resave: Save the session even if it wasn't modified. We'll set this to false
 *
 * saveUninitialized: If a session is new, but hasn't been changed, save it.
 * We'll set this to true.
 */

//Session Page.
// require the configuration at the top of the file
var passport = require('./config/ppConfig');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var NODE_ENV = require("node-env") //Do I need this?
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET || 'donttellanybody',
  resave: false,
  saveUninitialized: true
}));

// initialize the passport configuration and session as middleware
app.use(passport.initialize()); //position  and orders are very important. need to initialize before session.
app.use(passport.session());

app.use('/auth', require('./controllers/auth'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', function(req, res) {
  res.render('profile');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
