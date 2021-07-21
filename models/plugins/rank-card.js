const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    GUILD: String,
    URL: String
});

const Model = module.exports = mongoose.model('rank-cards', Schema);