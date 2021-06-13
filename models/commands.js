const mongoose = require('mongoose');

const CmdSchema = new mongoose.Schema({
    user: String,
    uses: Number,
    hungry: Boolean,
    lastfead: Number
});

const CmdModel = module.exports = mongoose.model('commands', CmdSchema);