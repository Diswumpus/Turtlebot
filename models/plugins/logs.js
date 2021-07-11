const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    guild: String,
    logsch: String,
    user: Boolean,
    server: Boolean,
    message: Boolean,
    ticket: Boolean,
    mod: Boolean,
    clickrole: Boolean
});

const Model = module.exports = mongoose.model('logs', Schema);