"use strict"

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var AttendeeSchema = new Schema({
    event: Object,
    attendee_username: String
})
module.exports = mongoose.model('Attendee', AttendeeSchema)