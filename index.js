const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!";
const roleName = '2 Month Supporter';


client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {
    //if(message.content.startsWith(`${prefix}tpwhois`)){
        var Member = message.mentions.members.first()
        if(!Member){
            var Member = message.member
        }
        var status = Member.presence.status
        if(status == "dnd"){
            var status = "Do not Disturb"
        }
        var joinedSince = new Date() - Member.joinedAt
        let differentDays = Math.round(joinedSince / (1000 * 3600 * 24));
        if (differentDays >= 60 && !Member.roles.cache.some(role => role.name === roleName))
        {
            const role = message.guild.roles.cache.find(role => role.name === roleName);
            Member.roles.add(role);
            let whoisEmbed = new Discord.MessageEmbed()
            .setTitle(`Hey ${Member.displayName}!`)
            .setColor("PURPLE")
            .setDescription(`you are getting upgraded`)
            .addField("Joined since", differentDays)
//            .addField("Joined at", Member.joinedAt)
//            .addField("Status", status)
            .setFooter("Turtlebot")
            message.channel.send(whoisEmbed)
        }

    //}
});

client.login('ODMxNzEyNjI2NjI2MTM0MDM3.YHZOvg.GeF2mztB7iDGvqpP14YTGEEGSmI');
