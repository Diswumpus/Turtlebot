const Discord = require('discord.js');
const dt = require('../../../discord-turtle/index');

module.exports = {
    name: 'gtn',
    category: 'Fun',
    description: 'Play guess the number!',
    async execute(message, Member, args) {
        const dtgame = new dt.guessthenumber()
        .start(message);
    }
}