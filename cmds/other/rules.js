const Discord = require('discord.js');

module.exports = {
    name: 'rules',
    description: 'TURTLEPAWS SERVER ONLY',
    async execute(message, Member, args) {
        if(message.author.id !== '820465204411236362') { 
            return message.delete();
        }
        const channel = message.channel;//message.client.channels.cache.get('824406474804953109');
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();
        const icon = 'https://cdn.discordapp.com/icons/824365717573992480/b251af56c4d6c5d4f6ec8be0cc040bb1.png?size=4096'
        const ver = message.client.emojis.cache.find(em => em.name === "verify");
        const turtlebot = message.client.emojis.cache.find(em => em.name === "Turtlebot");
        const blobpar = message.client.emojis.cache.find(em => em.name === "Party_blob");
        const blobwa = message.client.emojis.cache.get('585649906677710851')
        const blobwave = message.client.emojis.cache.find(em => em.name === "ablobwave");
        const serverName = Member.guild.name
        const rules = new Discord.MessageEmbed()
        .setColor(`BLUE`)
        .setDescription(`By residing in this server, you agree to abide by [Discord's Terms of Service](https://discord.com/terms) & [Community Guidelines](https://discord.com/guidelines), as well as all of our rules. On behalf of our staff team, we hope you have a pleasant stay in the Café!`)
        .addField(`Rule #1: Respect`, "```This is a PG-13 server. Please watch your language while chatting. Toxicity, spamming, raiding, and NSFW content are prohibited. Talking about suicide or self-harm is not welcome.```", true)
        .addField(`Rule #2: Discrimination`, "```Racism, sexism, and homophobic behavior are not tolerated. Slurs will not be tolerated, no matter what the context is. Please report any discriminatory behavior to our staff team.```", true)
        .addField(`Rule #3: Filters`, "```Using spoilers, jokes, or memes to suggest innapropriate (18+) words or terms is not allowed. We have strict chat filters, so if your message got deleted, please don't send it again.```", true)
        .addField('Rule #4: Advertising', `\`\`\`We have specific channels for advertising and sharing. Do not share your content, or tell others to view it in other chatrooms. Do not private message our users with links, invites, or ads.\`\`\``, true)
        .addField('Rule #5: English Only', "```We can only effectively moderate in English.Please keep all discussion in English, or it will be deleted!In the future, we may add support for a global chatroom.```", true)
        .addField('\\ㅤ', `**[Get Roles Here](https://discord.com/channels/824365717573992480/828715807562661918/) | [Staff Applications](https://forms.gle/Pko1k33xQsaMsMti7)**`)
        .setFooter(`Finally, our moderators may remove or ban you at any time without warning.\nJust because something bad isn't in the rules doesn't mean it's allowed here!`, )
        await webhook.send({
            username: serverName,
            avatarURL: message.guild.iconURL(),
            embeds: [rules],
        });
    },
}; 