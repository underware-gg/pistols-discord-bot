import { EmbedBuilder } from "discord.js";
import { Duelist } from "../generated/graphql";
import { Colors } from "./constants.js";
import { formatTimestamp } from "../utils/misc.js";

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
  full = true,
}: {
  duelist: Duelist;
  title: string;
  full?: boolean;
}): EmbedBuilder[] {
  if (!duelist) {
    // If the duelists array is empty, return a single embed with a message indicating no duelists found
    const embed = new EmbedBuilder().setDescription("No duelists found.");
    return [embed];
  }

  const badge = duelist.honour > 90 ? "👑" : "";

  const embed = new EmbedBuilder()
    // .setTitle(`${title}: ${name}`)
    .setTitle(title)
    .setColor(Colors.Medium)
    .setThumbnail(makeSquareProfilePicUrl(duelist.profile_pic))
    // .setImage(makeFullProfilePicUrl(duelist.profile_pic))
    // .setDescription(`\`${duelist.address}\``)
    .setFooter({ text: `Since: ${formatTimestamp(duelist.timestamp)}` })
    .addFields(
      {
        name: duelist.name,
        // value: `${shortAddress(duelist.address)}`,
        value: `\`${duelist.address}\``,
      }
    );

  if (full) {
    const winRatio = (duelist.total_duels > 0 ? Math.floor((duelist.total_wins / duelist.total_duels) * 100) : null);
    embed.addFields(
      {
        name: "Honour",
        value: `${duelist.honour / 10} ${badge}`,
        inline: true,
      },
      {
        name: "Duels",
        value: `${duelist.total_duels}`,
        inline: true,
      },
      {
        name: "Wins",
        value: `${duelist.total_wins}`,
        inline: true,
      },
      {
        name: "Losses",
        value: `${duelist.total_losses}`,
        inline: true,
      },
      {
        name: "Draws",
        value: `${duelist.total_draws}`,
        inline: true,
      },
      {
        name: "Win Ratio",
        value: winRatio ? `${winRatio}%` : "?",
        inline: true,
      },
    );
  }

  return [embed];
}


export const makeSquareProfilePicUrl = (profile_pic: number): string => {
  return `${process.env.CLIENT_URL}/profiles/${('00' + profile_pic).slice(-2) }_sq.jpg`;
}

export const makeFullProfilePicUrl = (profile_pic: number): string => {
  return `${process.env.CLIENT_URL}/profiles/${('00' + profile_pic).slice(-2) }_a.jpg`;
}
