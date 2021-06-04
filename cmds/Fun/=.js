const { Calculator } = require('weky')
const Discord = require('discord.js');

module.exports = {
    name: 'calc',
    description: 'A embed template',
    category: 'Fun',
    async execute(message, Member, args) {
        await Calculator(message)
    },
};