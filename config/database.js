/**
 * Created by Hoang Si on 5/7/2018.
 */
const dotenv = require('dotenv').config(),
    mongoose = require('mongoose');
mongoose.connect('mongodb://root:123458@127.0.0.1:27017/airvting');
module.exports = mongoose;