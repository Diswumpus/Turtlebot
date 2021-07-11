const Discord = require('discord.js');
const brs = require('../models/br');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isButton()) return;
        let met = '0'
        let bfind = await brs.findOne({
            guild: interaction.guild.id,
            button1: interaction.customId
        });
        if(!bfind){
            met = '1'
            bfind = await brs.findOne({
                guild: interaction.guild.id,
                button2: interaction.customId
            });
        }
        if(!bfind){
            met = '2'
            bfind = await brs.findOne({
                guild: interaction.guild.id,
                button3: interaction.customId
            });
        }
        if(!bfind) return
        let role;
        if(met === '0'){
            role = interaction.guild.roles.cache.get(bfind.role1)
        } else if(met === '1'){
            role = interaction.guild.roles.cache.get(bfind.role2)
        } else if(met === '2'){
            role = interaction.guild.roles.cache.get(bfind.role3)
        }
        if(!role) return
        if(!interaction?.member?.roles?.cache?.has(role.id)){
        interaction.member.roles.add(role.id)
        await interaction.reply({ content: `Gave you the ${role} role!`, ephemeral: true });
        } else {
            interaction.member.roles.remove(role.id)
            await interaction.reply({ content: `Removed the ${role} role!`, ephemeral: true });
        }
        const lModel = require('../models/plugins/logger');
        let v = await lModel.find({
            guild: interaction.guild.id
        });
        if(v){
        v.forEach(c => {
              if(c.ticket === true){
                    const ch = client.channels.cache.get(`${c.logsch}`)
                    const nembed = new Discord.MessageEmbed()
                    .setTitle(`${require('../emojis.json').channeladd} ${interaction.user.tag} Got the ${role.name}!`)
                    require('../models/plugins/logger').log(ch, 'clickbutton', nembed)
              }
        });
      }
	},
};