const Discord = require('discord.js');
const emojis = require('../../emojis.json');
const dt = require('../../../discord-turtle/index');
const interactionsFile = require('../../interactions');

module.exports = {
    name: 'verify',
    category: 'Dev',
    description: 'Eval some code!',
    /**
     * @param {Discord.Message} message 
     * @param {Discord.GuildMember} Member 
     * @param {String[]} args 
     */
    async execute(message, Member, args) {
       const v = new dt.captcha();
       v.setRole(message.guild.roles.cache.get('880595567896571925'))
       v.setImageEmoji('881235615025365023')
       v.send(message.channel, message.client)   
    },
    /**
     * @param {Discord.Interaction} interaction 
     * @param {Discord.Client} client 
     */
    async interactionExecute(client, interaction) {

    },
};