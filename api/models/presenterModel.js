"use strict"

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var PresenterSchema = new Schema({
    event_id: String,
    presenter_username: String
})
module.exports = mongoose.model('Presenter', PresenterSchema)