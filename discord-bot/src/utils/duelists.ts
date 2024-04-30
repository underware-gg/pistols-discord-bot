import { APIEmbed, EmbedBuilder } from "discord.js";
import { Duelist } from "../generated/graphql";
import { Colors } from "./constants.js";
import { feltToString } from "../utils/misc.js";


//
// Format Challenges as embeds
//
// example usage:
// return interaction.editReply({
//     embeds: formatChallengesAsEmbeds(challenges),
// });
//
// reference:
// https://discordjs.guide/popular-topics/embeds.html
//

export function formatDuelistAsEmbeds({
  duelist,
  title,
}: {
  duelist: Duelist;
  title?: string;
}): EmbedBuilder[] {
  if (!duelist) {
    // If the duelists array is empty, return a single embed with a message indicating no duelists found
    const embed = new EmbedBuilder().setDescription("No duelists found.");
    return [embed];
  }

  const embeds: EmbedBuilder[] = [];

  const timestamp = new Date(duelist.timestamp * 1000);
  const name = feltToString(duelist.name);
  const url = `${process.env.CLIENT_URL}/profiles/${duelist.profile_pic}_a.jpg`;
  const embed = new EmbedBuilder()
    .setTitle(`${title}: ${name}`)
    //   .setThumbnail(`attachment://profile_pic_${duelist.profile_pic}.png`)
    .setThumbnail(`${url}`)
    .addFields(
      {
        name: "Address",
        value: `${duelist.address.substring(0, 6) + "...."}`,
      },
      {
        name: "Honour",
        value: `${duelist.honour / 10} ${duelist.honour > 90 ? " 👑" : ""}`,
      },
      {
        name: "Duel Stats",
        value: `Total Duels: ${duelist.total_duels}\n`,
      },
      {
        name: "Duel Elapsed Time",
        value: `${timestamp.toLocaleString()}`,
      },
      {
        name: `Duels by ${name}`,
        value: `Type \`/duels_by_duelist \``,
      }
    );

  embeds.push(embed);

  return embeds;
}
