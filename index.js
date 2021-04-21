const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!"

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if(message.content.startsWith(`${prefix}tpwhois`)){
        var Member = message.mentions.members.first()
        if(!Member){
            var Member = message.member
        }
        var status = Member.presence.status
        if(status == "dnd"){
            var status = "Do not Disturb"
        }
        let whoisEmbed = new Discord.MessageEmbed()
            .setTitle(`Who is ${Member.username}?`)
            .setColor("PURPLE")
            .setDescription(`ID: ${Member.id}`)
            .addField("Joined at", Member.joinedAt)
            .addField("Status", status)
            .addField("Created at", Member.createdAt)
            .setFooter(d)
        message.channel.send(whoisEmbed)
    }
});

client.login('ODMxNzEyNjI2NjI2MTM0MDM3.YHZOvg.GeF2mztB7iDGvqpP14YTGEEGSmI');
