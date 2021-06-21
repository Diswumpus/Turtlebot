const Discord = require("discord.js");
module.exports = {
 name: "ping",
 category: 'Info',
 category: "info",

 description: "Returns latency and API ping",
 timeout: 10000,
 execute: async (message, Member, args) => {
   message.channel.send({ content: `🏓 Pinging....`}).then((msg) => {
     const _ = new Discord.MessageEmbed()
       .setTitle("Pong!")
       .setDescription(
         `🏓 Pong!\nLatency is ${Math.floor(
           msg.createdTimestamp - message.createdTimestamp
         )}ms\nAPI Latency is ${Math.round(message.client.ws.ping)}ms`
       )
       .setColor("RANDOM");
     msg.edit({ embeds: [_] });
     msg.edit({ content: "\u200B" });
   });
 },
};
//Pong ping !!!