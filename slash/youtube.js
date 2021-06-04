const Discord = require('discord.js');
const fetch = require('node-fetch');
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: 'youtube',
  async execute(client, interaction) {
    if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
      let ytuser = interaction.options.length > 1 ? interaction.options[1].user : interaction.user;
      console.log('Comment', interaction.options[0])
      console.log('Comment2', interaction.options[0].value)
      let comment = interaction.options[0].value;
      console.log(comment)
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
  },
};
//