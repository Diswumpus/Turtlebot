const Discord = require("discord.js")
const canvacord = require("canvacord");
const Levels = require("discord-xp");

module.exports = {
    name: "rank",
    description: "Shows your rank",
    async execute(client, interaction) {
        //const userData = getDataSomehow();
        
        const target = interaction.options.length > 0 ? interaction.options[0].user : interaction.user;

        //const target = message.mentions.users.first() || interaction.user;
        const avatarr = target.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })

        // const user = await Levels.fetch(target.id, message.guild.id);
        const user = await Levels.fetch(target.id, interaction.guild.id, true);
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
        if (!user) return interaction.reply("Seems like this user has not earned any xp so far.");
                const embedd = new Discord.MessageEmbed()
                .setAuthor(`${target.username}`, avatarr)
                .setTitle(`${target.username}'s Rank:`)
                .addField(`Current XP:`, `${user.xp}`)
                .addField(`Required XP:`, `${neededXp}`)
                .addField(`Rank:`, `${user.position}`)
                .setColor(`AQUA`)
                .addField(`Level:`, `${user.level}`)
                .setFooter(`${target.username}#${target.discriminator}`)
                await interaction.reply(embedd);
    },
};