'use strict'

const fs = require('fs').promises
const path = require('path')
const {InternalServerError} = require('../errors')

class Database {
    constructor(path) {
        this.localStoragePath = path
    }

    async select(table) {
        let database

        try {
            const filehandle = await fs.open(this.localStoragePath)
            database = await filehandle.readFile({encoding: 'utf8'})
            database = JSON.parse(database)
        } catch (err) {
            throw new InternalServerError('Database error')
        }

        return database[table]
    }

    async insert(table, data) {
        try {
            const filehandle = await fs.open(this.localStoragePath)
            let database = await filehandle.readFile({encoding: 'utf8'})
            database = JSON.parse(database)
            database[table].push(data)

            await filehandle.writeFile(JSON.stringify(database))
        } catch (err) {
            throw new InternalServerError('Database error')
        }

        return true
    }

    async update(table, {data}) {
        try {
            const filehandle = await fs.open(this.localStoragePath)
            let database = await filehandle.readFile({encoding: 'utf8'})
            database = JSON.parse(database)

            database[table] = database[table].map(record => {
                if (record.id === data.id) {
                    return {...data, record}
                }
                return record
            })

            await filehandle.writeFile(JSON.stringify(database))
        } catch (err) {
            throw new InternalServerError('Database error')
        }

        return true
    }
}

module.exports = new Database(path.resolve(__dirname, 'database.json'))

