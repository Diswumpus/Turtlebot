const Discord = require('discord.js');
const dt = require('discord-turtle');

module.exports = {
    name: 'rps',
    category: 'Fun',
    description: 'Play rock, paper, scissors!',
    async execute(message, Member, args) {
        const rpsgame = new dt.rps()
        rpsgame.setMessage(message)
        rpsgame.start();
    }
}