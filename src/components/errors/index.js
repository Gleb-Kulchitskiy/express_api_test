'use strict'

class ApiError extends Error {
    constructor(message, status) {
        super(message)
        this.messasge = message
        this.status = status
    }
}

class InternalServerError extends ApiError {
    constructor(message) {
        super(message, 500);
    }
}

module.exports = {ApiError, InternalServerError}