const mongoose = require('mongoose');

const { Schema } = mongoose;

//const path = require('path')

const UserSchema = new Schema({
    email: {type: String},
    password: {type: String}
})
mongoose.model('User', UserSchema)
module.exports = mongoose.model('User');