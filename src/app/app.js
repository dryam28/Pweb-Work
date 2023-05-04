// const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const passport = require('passport');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../public/views');

//middlewares
// app.use(morgan('dev'))
app.use(express.static(__dirname.replace('app', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//router
app.use('/auth', require('./routes/auth.routes'));
app.use('/', require('./routes/home.routes'));

//? Sync database changes
// require('./database/db')

module.exports = app;
