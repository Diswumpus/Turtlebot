const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    GUILD: String,
    channel: String,
    message: String
});

const Model = module.exports = mongoose.model('birthdays.config', Schema);