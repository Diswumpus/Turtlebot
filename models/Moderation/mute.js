const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    GUILD: String,
    USER: String,
    ROLES: [Object|String],
    TIME: Number
});

const Model = module.exports = mongoose.model('mutes', Schema);