const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');


//const keyv = new Keyv('sqlite:react.sqlite');
//keyv.on('error', err => console.error('Keyv connection error:', err));
// at the beginning of your code:
const client = new Discord.Client({
    presence: {
        status: 'online',
        activity: {
            name: `Your server! ${config.prefix}help`,
            type: 'WATCHING',
        },
    },
});
const roleName = '2 Month Supporter';

//client.snipes = new Discord.Collection();

client.once('ready', () => {
    console.log('Ready!');
});

client.commands = new Discord.Collection();
client.config = config;

const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

// Here we load all the commands into client.commands
for (const file of commandFiles) {
    const command = require(`./cmds/${file}`);
    console.log(`loading cmds/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// Client events
client.on('message', message => {
    //if(message.content.startsWith(`${prefix}tpwhois`)){
    var Member;
    var status;
    var differentDays = 0;
    if (message.mentions.members) {
        Member = message.mentions.members.first()
        if (!Member) {
            Member = message.member
        }
        status = Member.presence.status
    }

    if (status == "dnd") {
        var status = "Do not Disturb"
    }
    if (Member) {
        var joinedSince = new Date() - Member.joinedAt
        differentDays = Math.round(joinedSince / (1000 * 3600 * 24));
    }
    message.differentDays = differentDays;

    if (message.content.startsWith(config.prefix) && !message.author.bot) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) {
            message.reply(`sorry bud - not sure what you are asking for... what is '${commandName}'???`);
        }
        else {
            try {
                command.execute(message, Member, args);
            } catch (error) {
                console.error("yikes!!");
                console.error(error);
                message.reply("sorry I'm not feeling well - I think it is the pizza from last night");
            }
        }
    }


    if (differentDays >= 60 && Member && !Member.roles.cache.some(role => role.name === roleName)) {
        const role = message.guild.roles.cache.find(role => role.name === roleName);
        Member.roles.add(role);
        const flyEmoji = client.emojis.cache.get('831584687498461274')
        let whoisEmbed = new Discord.MessageEmbed()
            .setTitle(`Hey ${Member.displayName}!`)
            .setColor("AQUA")
            .setDescription(`You are getting the '**Supporter role**' ${flyEmoji}`)
            .addField(`${Member.displayName} joined`, `${message.differentDays} days ago`)
            //            .addField("Joined at", Member.joinedAt)
            //            .addField("Status", status)
            .setFooter("Turtlebot")
        message.channel.send(whoisEmbed)
    }
});

client.on('guildMemberAdd', member => { //This is creating an event saying when a member joins the server...

    const channel = member.guild.channels.cache.find(ch => ch.name.includes("welcome")); //** This is telling the script which server to send teh message in**\\
    const serverName = member.guild.name
    if (!channel) return;
    var blob1 = client.emojis.cache.get('835250126087389194')
    channel.send(`Welcome to ${serverName} ${blob1}, please read the <#824406474804953109>, hope you have a pleasant stay ${member}! Say ${config.prefix}verify to begin! ${member}`);
}); // That up ^here^ tells the bot what channel to send the message in!
client.login(config.token);
//client.user.setActivity('-help');