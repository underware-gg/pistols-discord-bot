// import {
//   SlashCommandBuilder,
//   ApplicationCommand,
//   CommandInteraction,
// } from "discord.js";
// import axios from "axios";

// // Define the Challenge interface to match your model (adjust field names if needed)
// interface Challenge {
//   duel_id: number; // Assuming u128 can be represented as a number in your context
// }

// interface QueryResult {
//   challenges: Challenge[];
// }

// const liveDuelsCommand = new SlashCommandBuilder()
//   .setName("live_duels")
//   .setDescription("Lists currently ongoing duels");

// async function handleLiveDuels(interaction: CommandInteraction) {
//   // Replace "YOUR_GRAPHQL_ENDPOINT" with your actual endpoint URL
//   const graphqlUrl = "YOUR_GRAPHQL_ENDPOINT";

//   // Define the GraphQL query
//   const query = `
//     query {
//       challenges(where: { state: InProgress }) {
//         duel_id
//       }
//     }
//   `;

//   // Send the GraphQL request
//   try {
//     const response = await axios.post(graphqlUrl, { query });
//     const data: QueryResult = response.data;

//     const challenges = data.challenges;
//     const duelIds = challenges.map((c) => c.duel_id);

//     if (duelIds.length === 0) {
//       await interaction.reply("There are no live duels currently.");
//     } else {
//       const message = `Live duel IDs: ${duelIds.join(", ")}`;
//       await interaction.reply(message);
//     }
//   } catch (error) {
//     console.error("Error fetching live duels:", error);
//     await interaction.reply(
//       "Failed to fetch live duels. Please try again later."
//     );
//   }
// }

// // export async function registerLiveDuelsCommand(
// //   registry: ApplicationCommand
// // ) {
// //   await registry.registerCommand(liveDuelsCommand.toJSON());
// // }

// export async function handleLiveDuelsInteraction(
//   interaction: CommandInteraction
// ) {
//   if (interaction.commandName === "live_duels") {
//     await handleLiveDuels(interaction);
//     console.log(interaction);
//   }
// }

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("live_duels")
    .setDescription("Replies with the live duels happening at the moment!"),
  async execute(interaction: any) {
    await interaction.reply("Live duels loading!!");
  },
};
