'use strict'

const BaseModel = require('../model')

class User extends BaseModel {
    constructor(user = {}) {
        super()

        this.id = user.id
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.phone = user.phone
        this.email = user.email
        this.password = user.password
        this.meta = user.meta
    }

    /*
    * some valuable methods here
    * */

}

module.exports = User