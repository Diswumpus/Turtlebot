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
        if(!bfind){
            met = '3'
            bfind = await brs.findOne({
                guild: interaction.guild.id,
                button4: interaction.customId
            });
        }
        if(!bfind){
            met = '4'
            bfind = await brs.findOne({
                guild: interaction.guild.id,
                button5: interaction.customId
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
        } else if(met === '3'){
            role = interaction.guild.roles.cache.get(bfind.role4)
        } else if(met === '4'){
            role = interaction.guild.roles.cache.get(bfind.role5)
        }
        if(!role) return
        if(!interaction?.member?.roles?.cache?.has(role.id)){
        interaction.member.roles.add(role.id)
        await interaction.reply({ content: `Gave you the ${role} role!`, ephemeral: true });
        } else {
            interaction.member.roles.remove(role.id)
            await interaction.reply({ content: `Removed the ${role} role!`, ephemeral: true });
        }
        const lModel = require('../models/plugins/logs');
        let v = await lModel.find({
            guild: interaction.guild.id
        });
        if(v){
        v.forEach(c => {
              if(c.clickrole === true){
                    const ch = client.channels.cache.get(`${c.logsch}`)
                    const nembed = new Discord.MessageEmbed()
                    .setTitle(`${require('../emojis.json').channeladd} Role Added`)
                    .setDescription(`${require('../emojis.json').channeladd} ${interaction.user.tag} Got the ${role.name}!`)
                    .setFooter('Buttons!', client.emojis.cache.get(require('../emojis.json').discordonid)?.url || 'https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kr44dbrbb9a.png')
                    .setThumbnail(interaction.user.displayAvatarURL())
                    .setAuthor(`${interaction.user.username}`, interaction.user.displayAvatarURL())
                    const logger = require('../models/plugins/logger').log;
                    new logger({
                        embed: nembed,
                        channel: ch,
                        type: 'clickbutton'
                    }).log()
              }
        });
      }
	},
};