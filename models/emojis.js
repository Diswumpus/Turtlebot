const mongoose = require('mongoose');

const EmojiSchema = new mongoose.Schema({
    emoji: String,
    user: String,
    guild: String,
    uses: Number
});

const EmojiModel = module.exports = mongoose.model('emojis', EmojiSchema);