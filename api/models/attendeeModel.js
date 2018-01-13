"use strict"

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var AttendeeSchema = new Schema({
    event_id: String,
    attendee_id: String
})
module.exports = mongoose.model('attendee', AttendeeSchema)