const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    USER: String,
    I: String
});

const Model = module.exports = mongoose.model('mod_users', Schema);