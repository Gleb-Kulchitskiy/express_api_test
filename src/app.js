'use strict'

const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const usersRouter = require('./components/user')
const authRouter = require('./components/auth')

const app = express()

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', authRouter)
app.use('/users', usersRouter)

app.use(function (req, res, next) {
  next(createError(404))
});

app.use(function (err, req, res, next) {
  console.log('ERR', err)
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send(err.message)
});

module.exports = app
