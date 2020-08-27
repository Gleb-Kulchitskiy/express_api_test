'use strict'

const router = require('express').Router();
const authService = require('./service')

const signUp = async (req, res, next) => {
    let userData
    try {
        userData = await authService.signUp(req.body)
    } catch (err) {
        return next(err)
    }
    res.cookie('jwt', userData.token, {httpOnly: true, secure: true, maxAge: 3600000})
    return res.send(userData.user)
}

const signIn = async (req, res, next) => {
    let userData
    try {
        userData = await authService.signIn(req.body)
    } catch (err) {
        return next(err)
    }

    res.cookie('jwt', userData.token, {httpOnly: true, secure: true, maxAge: 3600000})
    return res.send(userData.user)
}

const logout = async (req, res) => {

}

router.post('/signup', signUp)
router.post('/login', signIn)
router.post('/logout', logout)

module.exports = router
