const morgan = require('morgan');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../public/views');

//middlewares
// app.use(morgan('dev'))
app.use(express.static(__dirname.replace('app', 'public')));

//router
app.use('/auth', require('./routes/auth.routes'));
app.use('/', require('./routes/home.routes'));

//? Sync database changes
// require('./database/db')

module.exports = app;
