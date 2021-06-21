const Discord = require('discord.js');
const fetch = require('node-fetch');
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: 'youtube',
  async execute(client, interaction) {
    if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
      let ytuser = interaction.options?.find(c => c?.name === 'user')?.user || interaction.user;
      let comment = interaction.options?.find(c => c?.name === 'comment')?.value;
      await interaction.defer();
      let link = (`https://some-random-api.ml/canvas/youtube-comment?username=${ytuser.username}&comment=${comment}&avatar=${ytuser.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })}&dark=true%E2%80%8B`)
        const attachment = new Discord.MessageAttachment(link, 'youtube.png');
          //const json = await res.json()
          const embeedd = new Discord.MessageEmbed()
          .attachFiles(attachment)
          .setImage('attachment://youtube.png')
          .setColor(client.confiig.color)
          await wait(2000);
          await interaction.editReply({ embeds: [ embeedd ] });
    }
  },//discordjs/discord.js#7f0d93a2dacf07b39c358b2cf2f5519a757e43b5
};
//