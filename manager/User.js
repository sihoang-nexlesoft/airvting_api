/**
 * Created by A on 7/18/17.
 */
'use strict';
const User = require('../resourceAccess/User');
const createToken = require('../utils/token');
const bcrypt = require('bcrypt');
const Boom = require('boom');
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: 'ad626580',
    apiSecret: '3208d9e4d0b486e5',
}, { debug: true });


function hashPassword(password, cb) {
    // Generate a salt at level 10 strength
    bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
            bcrypt.hash(password, salt, (err, hash) => {
                return cb(err, hash);
            });
        }

    });
}


module.exports = {
    signUp: function (req) {
        const data = {
            email: req.payload.email,
            username: req.payload.username,
            birth : req.payload.birth
        }
        return new Promise(function (resolve, reject) {
            // return resolve(user)
            hashPassword(req.payload.password, (err, hash) => {
                if (err) { throw Boom.badRequest(err); }
                data.password = hash;
                User.insert(data).then(result => {
                    // If the user is saved successfully, issue a JWT
                    return resolve({ id_token: createToken(data), statusCode: 201, id: result.id })
                }).catch(err => {
                    throw Boom.badRequest(err);
                });
            });
        })
    },

    getVerify: function (req) {
        if (typeof req.payload.id != 'undefined') {
            const verify_code = Math.floor(1000 + Math.random() * 9000);
            const condition = { _id: req.payload.id }
            const data = {
                first_name: req.payload.first_name,
                last_name: req.payload.last_name,
                gender: req.payload.gender,
                phone_number: req.payload.phone_number,
                verify_code: verify_code
            }
            return new Promise(function (resolve, reject) {
                User.findOneAndUpdate(condition, data).then(result => {
                    // verify sms
                    var text = 'Arivting CODE: ' + verify_code, NUMBER = 84908179790;
                    nexmo.message.sendSms(
                        NUMBER, result.phone_number, text, { type: 'unicode' },
                        (err, result) => {
                            if (err) { console.log(err); } else {
                                console.log('Sent SMS verify!');
                            }
                        }
                    );
                    // end verify sms
                    return resolve({ id_token: createToken(data), statusCode: 201, id: result.id, verify_code: verify_code })
                }).catch(err => {
                    throw Boom.badRequest(err);
                });
            })
        }
    },

    verify: function (req) {
        const data = {
            verify: 1
        }
        if (typeof req.payload.id != 'undefined' && typeof req.payload.verify_code != 'undefined') {
            const condition = { _id: req.payload.id, verify_code: req.payload.verify_code }
            return User.findOneAndUpdate(condition, data);
        } else {

        }
    }
};