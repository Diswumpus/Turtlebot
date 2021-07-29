const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    GUILD: String,
    USER: String,
    DATE: Date,
    DATE2: String
});

const Model = module.exports = mongoose.model('birthdays', Schema);