const Discord = require('discord.js');
const r2msName = '2 Month Supporter';

module.exports = {
    name: 'rsetup',
    category: 'Config',
    description: `Creates the ${r2msName} role`,
    execute(message, Member, args) {
        if (message.member.permissions.has('MANAGE_MESSAGES')) {
            var guild = Member.guild;
            const blob8 = message.client.emojis.cache.find(em => em.name === "meow_cheer");
            var r2ms = guild.roles.cache.find(r => r.name === r2msName);
            if (!r2ms) {
                // Create a new role with data and a reason
                guild.roles.create({
                    data: {
                        name: '2 Month Supporter',
                        color: 'RANDOM',
                    },
                    reason: 'Required for the give role to user after 2 month',
                })
                    .then(console.log)
                    .catch(console.error);
                message.reply(`Successfully created! ${blob8}`);
            }
        }
    }
}