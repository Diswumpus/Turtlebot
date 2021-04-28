const Discord = require('discord.js');

module.exports = {
    name: 'info',
    description: 'Gives info about server,avatar',
    execute(message, Member, args) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}
         Your username: ${message.author.username}\nYour ID: ${message.author.id} 
         <${message.author.displayAvatarURL({ dynamic: true })}>`);
    },
};