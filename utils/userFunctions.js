/**
 * Created by A on 7/18/17.
 */
'use strict';

const Boom = require('boom');
const Users = require('../models/User.js');
const bcrypt = require('bcrypt');
const Logger = require('./logging');

function verifyUniqueUser(req, res) {
    // Find an entry from the database that
    // matches either the email or username
    Users.findOne({
        $or: [{ username: req.payload.username }, { email: req.payload.email }]
    }, (err, result) => {
        if(err) {
            Logger.error(err);
        res(err);
        }
        // Check whether the username or email
        // is already taken and error out if so
        if (result) {
            if (result.username === req.payload.username || result.email === req.payload.email) {
                res(Boom.badRequest('Username or Email taken'));
            }

        }
        else res(req.payload);
        // If everything checks out, send the payload through
        // to the route handler

    })
}

function verifyCredentials(req, res) {
    const password = req.payload.password;

    // Find an entry from the database that
    // matches either the email or username
    Users.findOne({
        $or: [{ username: req.payload.username }, { email: req.payload.email }]
    }, (err, result) => {
        if(err) {
            Logger.error(err);
        res(err);
        }
        if (result) {
            bcrypt.compare(password, result.password, (err, isValid) => {
                if (err) res(err);
                if (isValid) {
                    res(result);
                }
                else {
                    res(Boom.badRequest('Incorrect password!'));
                }
            });
        } else {
            res(Boom.badRequest('Incorrect Username or Email!'));
        }
    })
}

module.exports = {
    verifyUniqueUser: verifyUniqueUser,
    verifyCredentials: verifyCredentials
}