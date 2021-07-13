const Discord = require('discord.js');

module.exports = {
    name: 'roles',
    category: 'Reaction Roles',
    permissions: 'MANAGE_MESSAGES',
    description: 'See how many users have a role!',
    async execute(message, Member, args) {
        //Check perms
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return
        //Reply.
        let role;
        if(message.mentions.roles.first()){
            role = message.mentions.roles.first()
        } else {
            role = message.guild.roles.cache.get(args[0]);
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(`Users with role: ${role.name}`)
        .setDescription(`${role.members.map(m => `${m.user} `)}`)
        .setColor(message.client.confiig.color)
        message.channel.send({ embeds: [embed] });
    },
};