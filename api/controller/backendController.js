"use strict"

var mongoose = require("mongoose"),
    User = mongoose.model('User'),
    Events = mongoose.model('Event'),
    auth = require('../utils/authentication')



module.exports = {
    health: (req, res) => {
        res.send("running")
    },
    
    getEvents: (req, res) => {
        Events.find({}, (err, result) => {
            res.status(200).send(result)
        })
    },
    getdata: (req, res) => {
        console.log(req.body)
        res.send(req.body)
    },

    createEvent: (req, res) => {
        var formData = req.body
        var data = new Events(formData)
        data.save((err, result) => {
            if(err) res.send(err)
            res.status(200).send({"status": "failure", "data": result})
        })
    },

    // generateToken: (req, res) => {
    //     auth.validateToken(req.body.token, req.body.provider)
    //         .then((data)=>{
    //             User.findOne({email: data.email}, (err, user) => {
    //             var jwtToken = auth.generateJWT(data.email)
    //             if(err) {
    //                 console.log(err);
    //             }
    //             var result = {}
    //             if(!player) {
    //                 if(req.body.provider == 'facebook') {
    //                     result.picture = data.picture.data.url
    //                 }
    //                 else {
    //                     result.picture = data.picture
    //                 }
    //                 result.status = 'failure'
    //                 result.email = data.email
    //                 result.name = data.name
    //                 res.status(403).json(result)
    //             } else {
    //                 console.log(data.name + ' is logging in')
    //                 result.name = player.name
    //                 result.email = player.email
    //                 result.picture = player.picture
    //                 result.phone = player.phone
    //                 result.jwtToken = jwtToken
    //                 res.status(200).json(result)
    //             }
    //         })
    //     })
        
    // },
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
            else if(result.password == formData.password) {
                var jwtToken = auth.generateJWT(result.email)
                res.send({"status": "success", "jwtToken": jwtToken})
            } else {
                res.send({"status": "failure"})
            }
        })
    },

    getEvent: (req, res) => {
        var id = req.params.id
        Events.findById({id: id}, (err, result) => {
            if(err) res.send(err)
            res.status(200).send(result)
        })
    },

    getUser: (req, res) => {
        var id = req.params.id
        User.findById({email: email}, (err, result) => {
            if(err) res.send(err)
            res.status(200).send(result)
        })
    },

    validate: (req, res) => {
        var email = auth.decrypt(req.headers.jwttoken)
        User.findOne({email: email}, (err, result) => {
            if(err) res.send({"status": "failure"})
            res.status(200).send({"status": "success"})
        })
    }
}