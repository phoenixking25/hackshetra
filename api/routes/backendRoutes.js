"use strict"

module.exports = function(app) {
    var engine = require('../controller/backendController')

    app.route('/health')
        .get(engine.health)
        .post(engine.getdata)

    app.route('/events')
        .get(engine.getEvents)

    app.route('/createEvent')
        .post(engine.createEvent)

    app.route('/login')
        .post(engine.login)
    
    app.route('/signup')
        .post(engine.signup)

    app.route('/event/:id')
        .get(engine.getEvent)

    app.route('/user/:id')
        .get(engine.getUser)

    app.route('/validate')
        .get(engine.validate)

    // app.route('/addPresenter')
    //     .post(engine.addPresenter)
    

}