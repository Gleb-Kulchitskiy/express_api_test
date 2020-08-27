'use strict'

const config = require('config').get('jwt')

const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const UserModel = require('../user/model')
const {pick} = require('../utils/object')
const {ApiError} = require('../errors')

class AuthService {
    constructor(UserModel) {
        this.UserModel = UserModel
    }

    generateJWT(user) {
        const secret = config.secret;
        const expiresIn = config.expiresIn;

        return jwt.sign({id: user.id}, secret, {expiresIn});
    }

    async signUp({email, password}) {
        let user
        user = this.UserModel.findOne({email})

        if (user) {
            throw new ApiError('User already exists', 409)
        }

        const passwordHash = await argon2.hash(password);
        user = await this.UserModel.create({
            password: passwordHash,
            email,
        });

        return {user: pick(user, ['id', 'email']), token: this.generateJWT(user)}
    }

    async signIn({email, password}) {
        const predicate = user => user.email === email
        const user = await this.UserModel.findOne(predicate);

        if (!user) {
            throw new ApiError('User not found.', 404)
        }

        const verifiedPassword = await argon2.verify(user.password, password);
        if (!verifiedPassword) {
            throw new ApiError('Incorrect username or password.', 401)
        }

        return {user: pick(user, ['email', 'id']), token: this.generateJWT(user)}
    }
}

module.exports = new AuthService(UserModel)