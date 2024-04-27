import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { customEventSub } from "./queries/customEventSub.js";
import { EventKey } from "./utils/constants.js";
import * as dotenv from "dotenv";
dotenv.config();

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

export const client = new SapphireClient({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
  loadMessageCommandListeners: true,
});

console.log(`--- Torii url:`, process.env.TORII_URL)
console.log(`--- Client url:`, process.env.CLIENT_URL)
console.log(`--- Token:`, process.env.DISCORD_TOKEN ? 'Ok' : undefined)

console.log("--- Logging in.....");
await client.login(process.env.DISCORD_TOKEN);

customEventSub(EventKey.DuelistRegistered);
