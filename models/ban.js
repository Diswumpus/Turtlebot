const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    user: Object || String,
    timenow: { type: String, default: Date.now() },
    time: { type: String, default: null },
    action: String
});

const Model = module.exports = mongoose.model('user_bans', Schema);