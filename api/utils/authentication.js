"use strict"
var request = require('request'),
    mongoose = require("mongoose"),
    helper = require('../../conf')

const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = helper.secret 

module.exports = {
    validateToken: function(token, provider) {
        return new Promise((resolve, reject) => {
            if (provider == 'google') {
                var url
                url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + token
            }
            else {
                url = "https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cemail%2Cpicture&format=json&access_token=" + token
            }
            request.get(url, (err, response, body) => {
                if(err) {
                    console.log('token verification failed', err)
                    reject(err)
                }

                try {
                    body = JSON.parse(body)
                    if(!body.email)
                    {
                        console.log('email permission not given')
                        return reject('email permission not given')
                    }
                    resolve(body)
                }
                catch(err) {
                    console.error(err)
                    reject(err)
                }
            })
        })
    },
    generateJWT :function(data){
        var cipher = crypto.createCipher(algorithm,password)
        var crypted = cipher.update(data, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },
       
    decrypt:  function(text){
        var decipher = crypto.createDecipher(algorithm,password)
        var dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }
}