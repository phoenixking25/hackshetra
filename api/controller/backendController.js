"use strict"

var mongoose = require("mongoose"),
    User = mongoose.model('User'),
    Events = mongoose.model('Event'),
    Presenter = mongoose.model('Presenter'),
    Attendee = mongoose.model('Attendee'),
    auth = require('../utils/authentication')



module.exports = {
    health: (req, res) => {
        res.send("running")
    },
    
    getEvents: (req, res) => {
        var array = []
        Events.find({}, (err, result) => {
            if(err) res.send(err)
            res.status(200).send(result)
        })
    },
    getdata: (req, res) => {
        console.log(req.body)
        res.send(req.body)
    },

    createEvent: (req, res) => {
        var formData = req.body
        var email = formData.organiser_id
        User.findOne({email: auth.decrypt(email)}, (err, user) => {
            formData.organiser_name = user.name
            var data = new Events(formData)
            data.save((err, result) => {
                if(err) res.send(err)
                var array = {}
                console.log(formData.presenters)
                for(var i = 0; i < formData.presenters.length; i++) {
                    array.event_id = result.id
                    array.presenter_username = formData.presenters[i]
                    var pdata = new Presenter(array)
                    pdata.save((err, resu) => {
                        if(err) res.send(err)
                        console.log(resu)
                        array = {}
                    })
                }
                res.status(200).send({"status": "success", "data": result})

            })
        })
    },

    signup: (req, res) => {
        var formData = req.body
        formData.created_at = new Date()
        var data = new User(formData)
        data.save(function (err, result) {
            if (err) res.send(err)
            var jwtToken = auth.generateJWT(result.email)
            console.log(result.name + " is logging in")
            res.status(200).send({"status": "success", "jwtToken": jwtToken, "name": result.name, "phone": result.phone, "email": result.email, "picture": result.picture})
        });
    },
    login: (req, res) => {
        var formData = req.body
        User.findOne({email: formData.email}, (err, result) => {
            if(err) res.send(err)
            else if(!result) {
                res.send({"status": "failure"})
            }
            else if(result.password == formData.password) {
                var jwtToken = auth.generateJWT(result.email)
                res.send({"status": "success", "jwtToken": jwtToken, "_id": result._id})
            } else {
                res.send({"status": "failure"})
            }
        })
    },

    getEvent: (req, res) => {
        var id = req.params.id
        var obj = {}
        Events.findById({_id: id}, (err, result) => {
            if(err) res.send(err)
            obj.event = result
            Presenter.find({event_id: id}, (err, pre) => {
                if(err) res.send(err)
                obj.presenter = pre
                Attendee.find({event_id: id}, (err, att) => {
                    if(err) res.send(err)
                    obj.attendee = att
                    User.findOne({email: auth.decrypt(result.organiser_id)}, (err, user) => {
                        if(err) res.send(err)
                        obj.Organiser = user
                        res.send(obj)
                    })
                })
            })
        })
    },

    getUser: (req, res) => {
        var id = req.params.id
        var obj = {}
        User.findById({_id: id}, (err, result) => {
            if(err) res.send(err)
            Attendee.find({attendee_username: result.username}, (err, att) => {
                obj.events = att
                obj.user = result
                res.status(200).send(obj)
            })
        })
    },

    validate: (req, res) => {
        var email = auth.decrypt(req.headers.jwttoken)
        User.findOne({email: email}, (err, result) => {
            if(err) res.send({"status": "failure"})
            if(!result) {
                res.send({"status": "failure"})
            } else {
                res.status(200).send({"status": "success"})
            }
        })
    },
    getUsers: (req, res) => {
        User.find({}, (err, result) => {
            if(err) res.send(err)
            res.send(result)
        })
    },

    attendEvent: (req, res) => {
        var event_id = req.params.id
        var data = {}
        User.findOne({email: auth.decrypt(req.headers.jwttoken)}, (err, result) => {
            if(err) res.send(err)
            else if(!result) res.send({"status": "failure"})
            Events.findById({_id: event_id}, (err, eve) => {
                data.event = eve
                data.attendee_username = result.username
                var adata = new Attendee(data)
                adata.save((err, result) => {
                    if(err) res.send(err)
                    res.send({"status":"success"})
                })
            })
        })
    }
}