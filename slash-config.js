const interactions = require("discord-slash-commands-client");

const interaction = new DiscordInteractions({
    applicationId: "834198928260988968",
    authToken: "ODM0MTk4OTI4MjYwOTg4OTY4.YH9aSw.au-3l6GvDPhBxwBZ1wMOr4PNZ7o",
    publicKey: "402361d77305f34790b4c7297ae0d3ee0a5d5c98f0544820b85dfe792168cec6",
  });
  // Get Global Commands
await interaction
.getApplicationCommands()
.then(console.log)
.catch(console.error);

// Get Guild Commands
await interaction
.getApplicationCommands("496279654483886100")
.then(console.log)
.catch(console.error);
const command = {
  name: "avatar",
  description: "get a users avatar",
  options: [
    {
      name: "small",
      description: "should the image be small",
      type: ApplicationCommandOptionType.BOOLEAN,
    },
  ],
};

// Edit Global Command
await interaction
  .createApplicationCommand(command, null, "545581357812678656")
  .then(console.log)
  .catch(console.error);

// Edit Guild Command
await interaction
  .createApplicationCommand(command, "496279654483886100", "545581357812678656")
  .then(console.log)
  .catch(console.error);
  // Delete Global Command
await interaction
.deleteApplicationCommand("545581357812678656")
.then(console.log)
.catch(console.error);

// Delete Guild Command
await interaction
.deleteApplicationCommand("545581357812678656", "496279654483886100")
.then(console.log)
.catch(console.error);
const command = {
  name: "avatar",
  description: "get a users avatar",
  options: [
    {
      name: "big",
      description: "should the image be big",
      type: ApplicationCommandOptionType.BOOLEAN,
    },
  ],
};

// Create Global Command
await interaction
  .createApplicationCommand(command)
  .then(console.log)
  .catch(console.error);

// Create Guild Command
await interaction
  .createApplicationCommand(command, "496279654483886100")
  .then(console.log)
  .catch(console.error);