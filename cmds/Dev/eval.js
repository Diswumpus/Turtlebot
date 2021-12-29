const Discord = require('discord.js');
const emojis = require('../../emojis.json');
const interactionsFile = require('../../interactions');

module.exports = {
    name: 'eval',
    category: 'Dev',
    description: 'Eval some code!',
    async clean(text) {
        if (typeof (text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    },
    /**
     * @param {Discord.Message} message 
     * @param {Discord.GuildMember} Member 
     * @param {String[]} args 
     */
    async execute(message, Member, args) {
        if (message.author.id !== config.ownerID) {
            message.channel.send()
            return
        };
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
    /**
     * @param {Discord.Interaction} interaction 
     * @param {Discord.Client} client 
     */
    async interactionExecute(client, interaction) {

    },
};