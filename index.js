const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const klawSync = require('klaw-sync')
const version = require('./version.json');
const mongoose = require('mongoose');
const Levels = require("discord-xp");
const Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://Turtlepaw:turttp@turtlebots-cluster.4radi.mongodb.net/Data', { useNewUrlParser: true, useUnifiedTopology: true })
let vernum = version.versionnum;
//const keyv = new Keyv('sqlite:react.sqlite');
//keyv.on('error', err => console.error('Keyv connection error:', err));
// at the beginning of your code:
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_INTEGRATIONS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"],


    presence: {
        status: 'online',
        activities: [{ name: `Your server! | v${vernum}`, type: 'WATCHING' }],
    }
});
//Slash commands are out!!
//Your server! ${config.prefix}help | WATCHING
const roleName = '2 Month Supporter';

//client.snipes = new Discord.Collection();

client.once('ready', () => {
    console.log('Ready!');
    Levels.setURL("mongodb+srv://Turtlepaw:turttp@turtlebots-cluster.4radi.mongodb.net/Data");
});

client.commands = new Discord.Collection();
client.slashcmds = new Discord.Collection();
client.snipes = new Discord.Collection();
client.config = config;
client.version = version;

const slashFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));

// Here we load all the commands into client.commands
for (const file of slashFiles) {
    const command = require(`./slash/${file}`);
    console.log(`loading slash/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.slashcmds.set(command.name, command);
}
const errorr = new Discord.MessageEmbed()
    .setTitle(`That's a 404`)
    .setColor(`YELLOW`)
    .setDescription(`This is a problem at our end we are clearing it up, please try again in a bit if it still does not work use ,problem`)
    .setImage(`https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kow11oq1p9a.png`)
client.on('interaction', async interaction => {
    if (!interaction.isCommand()) return;
    console.log(`received interaction ${interaction.commandName}`);
    const commandName = interaction.commandName;

    const command = client.slashcmds.get(commandName);
    if (!command) {
        // interaction.reply(`Sorry i don't think /${commandName} is possible ${opps}`);
    }
    else {
        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            // interaction.reply(`Something went very wrong ${opps}`);
        }
    }
});

const messagess = mongoose.model('messagess', Schema({
    id: String,
    guild: String,
    messagecount: Number
}));
client.messagess = messagess
// L E V E L S = >
client.on("message", async (message) => {

    let messageUser = await messagess.findOne({
        id: message.author.id
    });

    if (!messageUser) {
        messageUser = new messagess({
            id: message.author.id,
            messagecount: 0
        });
        await messageUser.save().catch(e => console.log(e));
    };

    await messagess.findOne({
        id: message.author.id
    }, async (err, dUser) => {
        if (err) console.log(err);
        dUser.messagecount += 1;
        await dUser.save().catch(e => console.log(e));
    });
    //   const doc = new messagess({
    //     id: message.author.id,
    //     guild: message.guild.id,
    //     messagecount: +1
    //   });
    //   // Inserts a new document with `name = 'Will Riker'` and
    //   // `rank = 'Commander'`
    //   await doc.save();
})

client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
    }
});

// L E V E L S -

client.on("messageDelete", async (message) => {
    try {
        if (message.author.bot) return;
        const snipes = message.client.snipes.get(message.channel.id) || [];
        snipes.unshift({
            content: message.content,
            author: message.author,
            image: message.attachments.first()
                ? message.attachments.first().proxyURL
                : null,
            date: new Date().toLocaleString("en-GB", {
                dataStyle: "full",
                timeStyle: "short",
            }),
        });
        snipes.splice(10);
        message.client.snipes.set(message.channel.id, snipes);
        let embed = new Discord.MessageEmbed()
            .setTitle(`New message deleted!`)
            .setDescription(
                `**The user ${message.author.tag} has deleted a message in <#${message.channel.id}>**`
            )
            .addField(`Content`, message.content, true)
            .setColor(`RED`);
        let channel = message.guild.channels.cache.find(
            (ch) => ch.name === "bot-log"
        );
        if (!channel) return;
        channel.send(embed);
    } catch (e) { }
});

// 2) Streams example, non for-await.
// Print out all JS files along with their size within the current folder & subfolders.
var commandFiles = klawSync('./cmds', { nodir: true, traverseAll: true, filter: f => f.path.endsWith('.js') })
for (const file of commandFiles) {
    const command = require(`${file.path}`);
    console.log(`loading ${command.category}/${command.name}: ${file.path}`);
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
    }

    if (Member) {
        var joinedSince = new Date() - Member.joinedAt
        differentDays = Math.round(joinedSince / (1000 * 3600 * 24));
    }
    message.differentDays = differentDays;
    message.client = client;

    if (message.content.startsWith(config.prefix) && !message.author.bot) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        const cat = client.emojis.cache.find(em => em.name === "cat1");
        if (!command) {
            message.reply(`That's not a command ${cat}`);
        }
        else {
            try {
                command.execute(message, Member, args);
            } catch (error) {
                console.error("Yikes!!");
                console.error(error);
                const x = client.emojis.cache.find(em => em.name === "X1");
                message.reply(errorr);
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

// Adding reaction-role function
client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == '839989770045620255') {
        if (reaction.emoji.name === '🦊') {
            await reaction.message.guild.members.cache
                .get(user.id)
                .roles.add('802208163776167977');
        }
        if (reaction.emoji.name === '🐯') {
            await reaction.message.guild.members.cache
                .get(user.id)
                .roles.add('802208242696192040');
        }
        if (reaction.emoji.name === '🎈') {
            await reaction.message.guild.members.cache
                .get(user.id)
                .roles.add('839988669954916354');
        }
    } else return;
});
client.on('message', message => {
    if (message.content === ';join') {
        message.delete();
        client.emit('guildMemberAdd', message.member);
    }
});
client.on('message', message => {
    if (message.content === ';leave') {
        message.delete();
        client.emit('guildMemberRemove', message.member);
    }
});
// Removing reaction roles
client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == '802209416685944862') {
        if (reaction.emoji.name === '🦊') {
            await reaction.message.guild.members.cache
                .get(user.id)
                .roles.remove('802208163776167977');
        }
        if (reaction.emoji.name === '🐯') {
            await reaction.message.guild.members.cache
                .get(user.id)
                .roles.remove('802208242696192040');
        }
        if (reaction.emoji.name === '🐍') {
            await reaction.message.guild.members.cache
                .get(user.id)
                .roles.remove('802208314766524526');
        }
    } else return;
});
client.on('guildMemberAdd', async (message) => { // this event gets triggered when a new member joins the server!
    // Firstly we need to define a channel
    // either using .get or .find, in this case im going to use .get()
    //const Channel = member.guild.channels.cache.get('channelid') //insert channel id that you want to send to
    const channel = message.guild.channels.cache.find(ch => ch.name.includes("welcome")); //** This is telling the script which server to send teh message in**\\
    const serverName = message.guild.name
    const rulech = message.guild.channels.cache.find(ch => ch.name.includes("rules"));
    if (!channel) return;
    const blob1 = client.emojis.cache.find(em => em.name === "ablobwave");
    const blannk = client.emojis.cache.find(em => em.name === "Blank");
    //making embed
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setThumbnail(message.user.displayAvatarURL())
        .setTitle(`**${message.displayName} Joined**`)
        .addField(`Welcome to ${serverName} ${blob1}`, `Please read the Rules, hope you have a pleasant stay ${message.displayName}! Say ${config.prefix}verify to begin! ${message.displayName}`)
        .setFooter(`${serverName}`, blob1.url)
    // sends a message to the channel
    channel.send(embed)
})
client.on('guildMemberRemove', async (message) => { // this event gets triggered when a new member leaves the server!
    // Firstly we need to define a channel
    // either using .get or .find, in this case im going to use .get()
    //making embed
    const channel = message.guild.channels.cache.find(ch => ch.name.includes("welcome")); //** This is telling the script which server to send teh message in**\\
    if (channel) {
        const serverName = message.guild.name
        const blob2 = client.emojis.cache.find(em => em.name === "ablobsigh");
        const rulech = message.guild.channels.cache.find(ch => ch.name.includes("rules"));
        let embede = new Discord.MessageEmbed()
            .setColor('RED')
            .setThumbnail(message.user.displayAvatarURL())
            .setTitle('A member left the server')
            .setDescription(`**${message.displayName}** has left ${serverName}, we now have ${message.guild.memberCount} members!`)
            .setFooter(`${serverName}`, blob2.url)
        // sends a message to the channel
        channel.send(embede)
    } else
    {
        console.error(`ok this is awkward but discord can't find a channel called welcome...`);
    }
})
client.login(config.token);
//client.user.setActivity(',help');