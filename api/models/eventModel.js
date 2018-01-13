"use strict"

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var EventSchema = new Schema({
    organiser_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    organiser_name: {
        type: String,
        required: true
    },
    context: {
        type: String,
        required: true,
    },
    time: String,
    date: String
})
module.exports = mongoose.model('Event', EventSchema)