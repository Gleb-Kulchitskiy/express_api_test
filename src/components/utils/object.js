'use strict'

exports.pick = (object, props) => {
    const result = {}

    props.forEach(prop => {
        result[prop] = object[prop]
    })

    return result
}