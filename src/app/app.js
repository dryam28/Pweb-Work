const morgan = require('morgan')
const express = require('express')
const ejs = require('ejs');
const app = express()

app.set('view engine', 'ejs')
app.set('views',  __dirname + '/../public/views')

//middlewares
// app.use(morgan('dev'))
app.use(express.static(__dirname.replace('app', 'public')))

//router
app.use('/auth', require('./routes/auth.routes'))

module.exports = app