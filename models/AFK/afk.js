const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    GUILD: String,
    USER: String,
    R: String
});

const Model = module.exports = mongoose.model('afk', Schema);