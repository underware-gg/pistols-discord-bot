import { EmbedBuilder, BaseMessageOptions, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { ChallengeState, Colors } from "../utils/constants.js";
import { formatTimestamp } from "../utils/misc.js";
import { duelist_duels, past_duels } from "../interactions/duels.js";
import { DuelistResponse } from "../queries/getDuelists.js";
import { tagDuelist } from "../utils/social_app.js";
import { makeSquareProfilePicUrl } from "../utils/pistols.js";

//
// Format Challenges as embeds
//
// example usage:
// return interaction.editReply({
//     embeds: await formatChallengesAsEmbeds(challenges),
// });
//
// reference:
// https://discordjs.guide/popular-topics/embeds.html
//

export async function formatDuelistPayload({
  duelist,
  title,
  full = true,
}: {
  duelist: DuelistResponse;
  title: string;
  full?: boolean;
}): Promise<BaseMessageOptions> {
  if (!duelist) {
    // If the duelists array is empty, return a single embed with a message indicating no duelists found
    const embed = new EmbedBuilder().setDescription("No duelists found.");
    return { embeds: [embed] };
  }

  let contents = []
  const { tag } = await tagDuelist(duelist.address)
  if (tag) contents.push(tag);
  contents.push(`\`${duelist.address}\``)

  const badge = duelist.honour > 90 ? "👑" : "";
  const embed = new EmbedBuilder()
    .setTitle(`${title}: ${duelist.name}`)
    .setColor(Colors.Medium)
    .setThumbnail(makeSquareProfilePicUrl(duelist.profile_pic))
    .setDescription(contents.join('\n'))
    .setFooter({ text: `Since: ${formatTimestamp(duelist.timestamp)}` })

  let buttons = new ActionRowBuilder<ButtonBuilder>();

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
        value: winRatio ? `${winRatio}%` : "-",
        inline: true,
      },
    );

    // Setup buttons
    const button1 = new ButtonBuilder()
      .setCustomId(duelist_duels().builder(duelist.address, ChallengeState.Awaiting))
      .setEmoji('🤝')
      .setLabel('Awaiting')
      .setStyle(ButtonStyle.Secondary);
    const button2 = new ButtonBuilder()
      .setCustomId(duelist_duels().builder(duelist.address, ChallengeState.InProgress))
      .setEmoji('⚔️')
      .setLabel('Live Duels')
      .setStyle(ButtonStyle.Success);
    const button3 = new ButtonBuilder()
      .setCustomId(past_duels().builder(duelist.address))
      .setEmoji('🪦')
      .setLabel('Past Duels')
      .setStyle(ButtonStyle.Secondary);

    buttons.addComponents(button1, button2, button3);
  }

  return {
    embeds: [embed],
    components: buttons.components.length > 0 ? [buttons] : [],
  }
}

