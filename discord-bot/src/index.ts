import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { POLL_INTERVAL } from "./config.js";
import { getTransations } from "./queries/getMoves.js";
// const { DISCORD_TOKEN, DISCORD_CHANNEL_ID, APPLICATION_ID } = require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events } = require("discord.js");

const user = new Client({ intents: [GatewayIntentBits.Guilds] });

user.commands = new Collection();

export const client = new SapphireClient({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
  loadMessageCommandListeners: true,
});

console.log("Logging in.....");

await client
  .login
  //discord token here.
  ();

// setInterval(getTransations, POLL_INTERVAL * 3);
console.log("user logged in");

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, "utility");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: any) => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      user.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// user.on(Events.InteractionCreate, (interaction: any) => {
//   if (!interaction.isChatInputCommand()) return;
//   console.log(interaction);
// });

user.on(Events.InteractionCreate, async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});
