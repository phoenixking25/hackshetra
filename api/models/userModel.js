"use strict"

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    age: Number,
    info: String,
    created_at: Date,
    interest: String
})
module.exports = mongoose.model('User', UserSchema)