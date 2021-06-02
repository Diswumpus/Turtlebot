const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    GuildID: String,
    welcome: Boolean,
    welcomech: String,
    welcomemsg: String,
    inviteremover: Boolean,
    welcomedm: Boolean,
    autosnipe: Boolean,
    banmsg: Boolean
});

const SettingsModel = module.exports = mongoose.model('settings', SettingsSchema);