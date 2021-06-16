const { MessageReaction, User, MessageEmbed } = require("discord.js");
const Db = require("../packages/reactionrole/models/schema.js");
const reactionCooldown = new Set();
const GuildDB = require('../database/guild');
const botCooldown = new Set();

module.exports = {
	name: 'messageReactionRemove',
	async execute(messageReaction, user, client) {


//ignore bot's reactions
if (client.user === user) return;

const { message, emoji } = messageReaction;

// fetch the member
const member = message.guild.members.cache.get(user.id);


const guildDB = await GuildDB.findOne({
  guildId: message.guild.id
})

//find in database
await Db.findOne({
        guildid: message.guild.id,
        reaction: emoji.toString(),
        msgid: message.id,
      },

   async (err, db) => {

  // return if reaction isnt in database
  if(!db) return;

  // return if the reaction's message ID is different than in database
  if(message.id != db.msgid) return; 

  // fetch the role to give
  const rrRole = message.guild.roles.cache.get(db.roleid);
  
  // return if role doesn't exist
  if (!rrRole) return;

// return (avoid rate limit + SPAM)
if(botCooldown.has(message.guild.id)) return;

let guild = client.guilds.cache.get(db.guildid); 
let guildName = guild.name;

let slowDownEmbed = new MessageEmbed()
.setDescription(`Slow Down There, You're on a cooldown\n\n**Role Name:** ${rrRole.name}\n**Guild Name:** ${guildName}`)
.setColor(message.client.confiig.color)

// add reaction Embed
let addEmbed = new MessageEmbed()
.setAuthor('Role Added', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png` , `${message.url}` )
.setDescription(`You have recieved the **${rrRole.name}** Role by reacting in ${guildName}`)
.setColor(message.client.confiig.color)


// remove reaction Embed
let remEmbed = new MessageEmbed()
.setAuthor('Role Removed', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png` , `${message.url}` )
.setDescription(`You have removed the **${rrRole.name}** Role by reacting in ${guildName}`)
.setColor(message.client.confiig.color)

//Reaction Role Error
let errorReaction = new MessageEmbed()
.setAuthor('Reaction Role Error', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png` , `${message.url}` )
.setDescription(` Failed to Add the role, since I'm Missing the Manage Roles Permission.\n\nPlease let an admin Know.`)
.setColor(message.client.confiig.color)




//checking for options 

// cooldown system
if(reactionCooldown.has(user.id)) return 



if(db.option === 1) {
      try {
        if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {
        await member.roles.remove(rrRole).catch(()=>{})
        reactionCooldown.add(user.id);
        setTimeout(()=>{
        reactionCooldown.delete(user.id)
        }, 2000);

        if(guildDB.reactionDM === true){
        if(botCooldown.has(message.guild.id)) return;
        member.send({ embeds: [remEmbed] }).catch(()=>{})
         botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 4000)


        }
  
        }
      } catch (err) {
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

if(botCooldown.has(message.guild.id)) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
  return member.send({ embeds: [errorReaction] }).catch(()=>{})
      }
    }
    
    if(db.option === 4) {
      try {
         if (!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){
        await member.roles.add(rrRole).catch(()=>{})
        if(guildDB.reactionDM === true){
        member.send({ embeds: [addEmbed] }).catch(()=>{})
        }
        reactionCooldown.add(user.id);
        setTimeout(()=>{
        reactionCooldown.delete(user.id)
        }, 2000);
      }
      } catch (err) {
            if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
if(botCooldown.has(message.guild.id)) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
    return member.send({ embeds: [errorReaction] }).catch(()=>{})
      }
    }



    }
  );
},


	};
	
