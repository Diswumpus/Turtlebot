const Discord = require('discord.js');
const config = require('./config.json');
// at the beginning of your code:
const client = new Discord.Client({
    presence: {
     status: 'online',
     activity: {
      name: 'Your server! .help  .setup',
      type: 'WATCHING',
     },
    },
   });
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
            const flyEmoji = client.emojis.cache.get('831584687498461274')
            let whoisEmbed = new Discord.MessageEmbed()
            .setTitle(`Hey ${Member.displayName}!`)
            .setColor("AQUA")
            .setDescription(`You are getting the '**Supporter role**' ${flyEmoji}`)
            .addField(`${Member.displayName} joined since`, differentDays)
//            .addField("Joined at", Member.joinedAt)
//            .addField("Status", status)
            .setFooter("Turtlebot")
            message.channel.send(whoisEmbed)
        }

    //}
});
client.on('message', message => {
    if(message.content.startsWith(`${config.prefix}help`)){
        let whoisEmbed = new Discord.MessageEmbed()
        .setTitle(`Commands`)
        .setColor("AQUA")
//        .setDescription(`Basic`)
            .addField("Basic", "None")
        .setFooter("Turtlebot")
        message.channel.send(whoisEmbed)
    

    }
});
client.on('message', message => {
    if(message.content.startsWith(`${config.prefix}test`)){
        let whoisEmbed = new Discord.MessageEmbed()
        .setTitle(`Testing`)
        .setColor("AQUA")
//        .setDescription(`<:Myemoji:829858304297271306>`)
            .addField("Is it working?", "<:Myemoji:829858304297271306>")
        .setFooter("Turtlebot :)")
        message.channel.send(whoisEmbed)
    

    }
    if (message.content === (`${config.prefix}ping`)) {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
    }
    if (message.content === (`OMG`)) {
        message.react('833491346018271253');
    }
    if (message.content === (`Yay!`)) {
        message.react('831584687498461274');
    }
    if (message.content === (`Yay`)) {
        message.react('831584687498461274');
    }
    if (message.content === (`Good morning everyone`)) {
        message.react('835250126087389194');
    }
    if (message.content === (`good morning everyone`)) {
        message.react('835250126087389194');
    }
    if (message.content === (`Goodmorning everyone`)) {
        message.react('835250126087389194');
    }
    if (message.content === (`goodmorning everyone`)) {
        message.react('835250126087389194');
    }
    if (message.content === (`Goodnight everyone`)) {
        message.react('835250124703400026');
    }
    if (message.content === (`goodnight everyone`)) {
        message.react('835250124703400026');
    }
    if (message.content === (`Good night everyone`)) {
        message.react('835250124703400026');
    }
    if (message.content === (`good night everyone`)) {
        message.react('835250124703400026');
    }
});

client.on('guildMemberAdd', member => { //This is creating an event saying when a member joins the server...
    
    const channel = member.guild.channels.cache.find(ch => ch.name.includes("welcome")); //** This is telling the script which server to send teh message in**\\
    
    if (!channel) return;
   
    channel.send(`Welcome to Murder Mystery Remastered, please read the rules and have a great time! Say !verify to begin! ${member}`);
  }); // That up ^here^ tells the bot what channel to send the message in!
client.login(config.token);
//client.user.setActivity('-help');