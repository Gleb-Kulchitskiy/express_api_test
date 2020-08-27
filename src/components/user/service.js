'use strict'

const UserModel = require('./model')

class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel
    }

    async getUsers() {
        let result = {};
        try {
            result = await this.UserModel.findAll();
        } catch (err) {
            throw new Error()
        }

        return result;
    }
}

module.exports = new UserService(UserModel)