const Discord = require('discord.js');

module.exports = {
    name: 'rules',
    description: 'This command is for help for the submit commmand',
    execute(message, Member, args) {
        const ver = message.client.emojis.cache.find(em => em.name === "verify");
        const turtlebot = message.client.emojis.cache.find(em => em.name === "Turtlebot");
        const blobpar = message.client.emojis.cache.find(em => em.name === "Party_blob");
        const blobwave = message.client.emojis.cache.find(em => em.name === "blobwave");
        const serverName = Member.guild.name
        // let rEmbed = new Discord.MessageEmbed()
        //     .setTitle()
        //     .setColor("AQUA")
        //     //        .setDescription(`${ver}`)
        //     .addField()
        //     .setFooter(`Turtlebot`, turtlebot.url)
        message.channel.send(`Welcome to ${serverName} ${blobwave}\n` + `The rules are:
        - No NSFW or NSFL
        - No overruling the admins or owner
        - Please respect the admins and the owners
        - No arguing
        - No spam if you want to spam do it in <#836292487936606258>
         Have fun! ${blobpar}
          
            Use ,verify to begin! ${ver}`);
    },
}; 