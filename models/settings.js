const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    GuildID: String,
    welcome: Boolean,
    welcomech: String,
    welcomemsg: String,
    inviteremover: Boolean,
    roles: [String],
    welcomedm: Boolean,
    autosnipe: Boolean,
    autosnipech: String,
    banmsg: Boolean
});

const SettingsModel = module.exports = mongoose.model('settings', SettingsSchema);