const mongoose = require('../config/database.js'),
    UsersSchema = new mongoose.Schema({
        username: String,
        email: String,
        birth: String,
        first_name: String,
        last_name: String,
        gender: Number,
        password: String,
        phone_number: String,
        thumbnail: String,
        cover_image: String,
        bookmarks: [{
            user_id: String,
            session_stream_id: String,
            created_at: String
        }],
        folowers: [{
            user_id: String,
            username: String
        }],
        folowers_num: Number,
        folowing: [{
            user_id: String,
            username: String
        }],
        folowing_num: Number,
        posts: Number,
        store_location: String,
        store_description: String,
        reviews: [{
            user_id: String,
            username: String,
            user_rating: Number,
            reviews: String
        }],
        reviews_num: Number,
        store_rating: Number,
        store_gifts: [{
            gift_id: String,
            gift_code: String,
            actived: Number
        }],
        store_premium: Number,
        air_coin: Number,
        schedules: {
            dates: [
                {
                    date: String
                }
            ],
            start_time: String,
            end_time: String
        },
        live: Number,
        verify_code: String,
        verify: Number,
        key: String,
        created_at: String,
        updated_at: String
    });
module.exports = mongoose.model('users', UsersSchema); 