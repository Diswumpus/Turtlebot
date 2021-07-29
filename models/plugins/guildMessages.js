const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    GUILD: String,
    USER: String,
    MESSAGES: Number
});

const Model = module.exports = mongoose.model('guild_messages', Schema);