/**
 * Created by A on 7/18/17.
 */
'use strict';

const Users = require('../models/User.js');
module.exports = {
    insert: function (data) {
        return Users.create(data)
    },
    findOneAndUpdate: function (condition, data) {
        return Users.findOneAndUpdate(condition, { $set: data }, { new: true })
    },
    find: function () {
        return Users.find({})
    },
    findOne: function (condition) {
        return Users.findOne(condition)
    }
}