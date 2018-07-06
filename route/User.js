/**
 * Created by A on 7/18/17.
 */
'use strict';
const Manager = require('../manager/User');
const Joi = require('joi');
const Response = require('./response').setup(Manager);
const verifyUniqueUser = require('../utils/userFunctions').verifyUniqueUser;
const verifyCredentials = require('../utils/userFunctions').verifyCredentials;
const createToken = require('../utils/token');
const User = require('../resourceAccess/User');

module.exports = {
    signUp: {
        tags: ['api', 'User'],
        description: 'Signup account - Return session token',
        pre: [
            { method: verifyUniqueUser }
        ],
        validate: {
            payload: Joi.object({
                username: Joi.string().alphanum().min(2).max(30).required(),
                email: Joi.string().email().required(),
                birth: Joi.string(),
                password: Joi.string().required()
            })
        },
        handler: function (req, res) {
            Response(req, res, 'signUp');
        }
    },

    getVerify: {
        tags: ['api', 'User'],
        description: 'Get code to verify account',
        validate: {
            headers:
                Joi.object({
                    'authorization': Joi.string().required().default('Bearer ')
                }).unknown(),
            payload: Joi.object({
                id: Joi.string().required(),
                phone_number: Joi.number().required()
            })
        },
        handler: function (req, res) {
            Response(req, res, 'getVerify');
        },
        auth: {
            strategy: 'jwt'
        }
    },

    verify: {
        tags: ['api', 'User'],
        description: 'Verify account',
        validate: {
            headers:
            Joi.object({
                'authorization': Joi.string().required().default('Bearer ')
            }).unknown(),
            payload: Joi.object({
                id: Joi.string().required(),
                verify_code: Joi.number().integer().required()
            })
        },
        handler: function (req, res) {
            Response(req, res, 'verify');
        },
        auth: {
            strategy: 'jwt'
        }
    },

    signIn: {
        tags: ['api', 'User'],
        description: 'Signin',
        pre: [
            { method: verifyCredentials, assign: 'user' }
        ],
        handler: (req, res) => {
            // If the user's password is correct, we can issue a token.
            // If it was incorrect, the error will bubble up from the pre method
            res({ id_token: createToken(req.pre.user) }).code(201);
        },
        validate: {
            payload: Joi.alternatives().try(
                Joi.object({
                    username: Joi.string().alphanum().min(2).max(30).required(),
                    password: Joi.string().required()
                }),
                Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            )
        }
    }
}