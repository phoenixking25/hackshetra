"use strict"

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var TimelineSchema = new Schema({
    event_id: {
        type: String,
        required: true
    },
    start_time: Date,
    end_time: Date,
    presenter_id: String
})
module.exports = mongoose.model('timeline', TimelineSchema)