var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'),
    Events = require('./api/models/eventModel'),
    //Timeline = require('./api/models/timeLineModel'),
    Presenter = require('./api/models/presenterModel')
    Attendee = require('./api/models/attendeeModel'),
    bodyParser = require('body-parser'),
    config = require('./conf'),
    cors = require('cors')

var promise = mongoose.connect(config.dbUrl, {
    useMongoClient: true,
    });

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var routes = require('./api/routes/backendRoutes')
routes(app)

app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('Api is running on: ' + port)