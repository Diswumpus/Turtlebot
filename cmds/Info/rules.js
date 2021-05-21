const Discord = require('discord.js');

module.exports = {
    name: 'rules',
    category: 'Info',
    description: 'TURTLEPAWS SERVER ONLY',
    execute(message, Member, args) {
        const ver = message.client.emojis.cache.find(em => em.name === "verify");
        const turtlebot = message.client.emojis.cache.find(em => em.name === "Turtlebot");
        const blobpar = message.client.emojis.cache.find(em => em.name === "Party_blob");
        const blobwave = message.client.emojis.cache.find(em => em.name === "blobwave");
        const serverName = Member.guild.name
        const rules = new Discord.MessageEmbed()
        .setTitle(`Welcome to ${serverName} ${blobwave}`)
        .setColor(`RED`)
        .setDescription(`The rules are:`)
        .addField(`Rule 1`, `No NSFW or NSFL`)
        .addField(`Rule 2`, `No overruling the admins or owner`)
        .addField(`Rule 3`, `Please respect the admins and the owners`)
        .addField(`Rule 4`, `No arguing`)
        .addField(`Rule 5`, `No spam if you want to spam do it in <#836292487936606258>`)
        .addField(`Rule 6:`, `Follow Discords ToS`)
        .setFooter(`Have fun!`, blobpar.url)
        message.channel.send(rules);
    },
}; 