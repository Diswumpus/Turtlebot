const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    welcome: String,
    inviteremover: String
});

const SettingsModel = module.exports = mongoose.model('settings', SettingsSchema);