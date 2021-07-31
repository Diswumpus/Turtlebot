const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const b = require('../../models/plugins/functions');
const emojis = require('../../emojis.json');

module.exports = {
	name: 'birthdays',
	category: 'Fun',
	description: 'The birthday command.',
    usage: '-add | --rm | --ls',
	aliases: ['b'],
        /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.User} Member 
     * @param {Array} args 
     */
	async execute(message, Member, args) {
        return message.client.beta(message)
        const mFilter = mm => 'i' === 'i'
        const embed = new MessageEmbed()
        .setColor(message.client.confiig.color)
        if(args[0] === '--add'){
            embed.setDescription(`${message.author}, enter the date of ${Member.user}'s birthday`)
            const m = await message.channel.send({ embeds: [embed] });
            await message.channel.awaitMessages({ filter: mFilter, time: 60000, errors: ['time'], max: 1 })
            .then(async collected => {
                if(collected.first().content.toString().toLocaleLowerCase() === 'cancel') return message.channel.send({ embeds: [embed.setDescription(`${emojis.xmark} ${message.author}, command canceled`)]})
                b.addDay(Member, collected.first().content.toString())
                message.channel.send({ embeds: [embed.setDescription(`${emojis.check1} ${message.author}, Added ${Member}'s birthday!`)]})
            })//.catch(( )=>{ })
        } else if(args[0] === '--rm'){
            
        } else {
                const bls = await b.listDays(message.guild.id)
                if(!bls || bls.length === 0){
                    embed.setDescription(`${message.author}, I don't know any birthdays yet. Use the \`${message.client.config.prefix}${this.name} --add\` command to set a birthday.`)
                }
                bls.forEach(e => {
                    let u = message.client.users.cache.get(e.USER)
                    let d = Math.round(new Date(e.DATE)/1000)
                    embed.addField(`${u}`, `${d}`)
                })
                message.channel.send({ embeds: [embed] });
        }
	},
};