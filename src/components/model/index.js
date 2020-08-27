'use strict'

const db = require('../db')
const {InternalServerError} = require('../errors')

class BaseModel {
    static getTableName() {
        return this.name.toLowerCase() + 's' // here can be mapping for plural spelling rules
    }

    static async create(data) {
        let result

        try {
            result = await db.insert(BaseModel.getTableName(), data)
        } catch (err) {
            throw err
        }

        return new this(result)
    }

    static async findOne(predicate) {
        let result

        try {
            const data = await db.select(BaseModel.getTableName())
            result = data.filter(predicate)

        } catch (err) {
            throw new InternalServerError('Db Error.')
        }

        return result[0] ? new this(result[0]) : null
    }

    static findAll() {
        // some logic here
    }
}


module.exports = BaseModel