'use strict'

const expressJwt = require('express-jwt')
const config = require('config').get('jwt')
const UserModel = require('../user/model')

const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
}

const isAuth = expressJwt({
    secret: config.secret,
    requestProperty: 'token',
    getToken: getTokenFromHeader,
})

const attachUser = async (req, res, next) => {
    const tokenData = req.tokenData;
    const predicate = user => user.id === tokenData.id
    const user = await UserModel.findOne(predicate())

    req.user = user;

    if (!user) {
        return res.status(401).end('User not found')
    } else {
        return next();
    }
}

module.exports = {isAuth, attachUser}