'use strict'

const router = require('express').Router();
const userService = require('./service')
const {middleware} = require('../auth')

const getUsers = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('unauthorized')
    }

    let result

    try {
        result = await userService.getUsers()
    } catch (err) {
        return next(err)
    }

    return result
}

router.get('/', middleware.isAuth, middleware.attachUser, getUsers)

module.exports = router