const Discord = require('discord.js');

module.exports = {
    name: 'ruless',
    category: 'Info',
    description: 'TURTLEPAWS SERVER ONLY',
    async execute(message, Member, args) {
        const channel = message.client.channels.cache.get('847972176132440135');
        try {
            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.first();
            const blobwave = message.client.emojis.cache.find(em => em.name === "blobwave");
            const serverName = Member.guild.name
            message.channel.send(`Sent!`)
            const rules = new Discord.MessageEmbed()
            .setTitle(`Welcome to ${serverName} ${blobwave}`)
            .setColor(`RED`)
            .setDescription(`OUR SIMPLE RULES`)
            .addField(`Rule 1`, `Nothing against discords T.O.S, this includes cracking, and other blacklisted words.`)
            .addField(`Rule 2`, `Please respect one another. This includes members and staff.`)
            .addField(`Rule 3`, `No advertising in anyway shape or form, this includes YouTube links or Discord links.`)
            .addField(`Rule 4`, `No Spamming in anyway.`)
            .addField(`Rule 5`, `No NSFW at ALL!`)
            .addField(`Rule 6:`, `No harassment in anyway.`)
            .addField(`Rule 7:`, `No DM advertising.`)
            .addField(`Rule 8:`, `No account buying and or selling.`)
            .addField(`Rule 9:`, `Use the correct channels.`)
            .addField(`Rule 10:`, `Keep it family friendly`)
            .addField(`Extra Info`, `If you would like to report anybody for breaking the rules, please message a staff member.\nNo asking for roles.\nIf you disrespect moderators it will result in a ban\nDo NOT Spam @ Jxremiah or DM him to talk to him\nBreaking any of these will be a instant ban or mute depending on the rule that was broken`)
            .addField(`**WARNING:**`, `**EVEN IF THE RULE ISN’T LISTED HERE THEN THAT DOESN’T MEAN THAT OUR STAFF TEAM CAN’T WARN YOU FOR SOMETHING THATS NOT A RULE. IF THEY FEEL A REASON TO WARN, MUTE, KICK, OR BAN. THEY MAY DO SO**`)
            .setFooter(`Turtlebot Webhook`, blobwave.url)
            await webhook.send({
                username: 'Jxremiah | 2.0',
                avatarURL: 'https://cdn.discordapp.com/icons/617927093941960705/0e613c63be9b408439bca2bd946df1d8.png?size=4096',
                embeds: [rules],
            });
        } catch (error) {
            console.error('Error trying to send: ', error);
        }
    },
}; 