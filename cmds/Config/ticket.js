
const check = '✅'
let registered = false

const registerEvent = (client) => {
  if (registered) {
    return
  }
  const ticketChannel = client.channels.cache.find(ch => ch.name.includes("ticket"));
  registered = true

  console.log('REGISTERING EVENTS')

  client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) {
      return
    }

    console.log('HANDLING REACTION')
    const { message } = reaction
    if (message.channel === ticketChannel) {
      message.edit(`Fixed! ✅`);
    }
  })
}

module.exports = {
  name: 'ticket',
  category: 'Config',
  description: 'Creates a ticket',
  minArgs: 1,
  expectedArgs: '<message>',
  execute: async (message, Member, args) => {
  //callback: (userMessage, arguments, text, client) => {
    const { guild, member } = Member
    const textt = args[0]
    registerEvent(message.client)
    const channel = message.client.channels.cache.find(ch => ch.name.includes("ticket"));
    //const channel = guild.channels.cache.get(channelId)
    channel
      .send(
        `A new ticket has been created by <@${Member.id}>\n"${textt}"\n\nClick the ${check} icon when this issue has been resolved.`
      )
      .then((ticketMessage) => {
        ticketMessage.react(check)

        message.reply(
          'Your ticket has been sent! Expect a reply within 24 hours.'
        )
      })
  },
}