import { EmbedBuilder, BaseMessageOptions, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder } from "discord.js";
import { ChallengeState, Colors } from "../utils/constants.js";
import { formatTimestamp } from "../utils/misc.js";
import { duelist_duels, past_duels } from "../interactions/duels.js";
import { DuelistResponse } from "../queries/getDuelists.js";
import { tagDuelist } from "../utils/db_accounts.js";
import { makeSquareProfilePicUrl } from "../utils/pistols.js";
import { makeButtonsComponentsRow } from "./messages.js";

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

  const badge = duelist.score?.honour > 90 ? "👑" : "";
  const embed = new EmbedBuilder()
    .setTitle(`${title}: ${duelist.name}`)
    .setColor(Colors.Medium)
    .setThumbnail(makeSquareProfilePicUrl(duelist.profile_pic))
    .setDescription(contents.join('\n'))
    .setFooter({ text: `Since: ${formatTimestamp(duelist.timestamp)}` })

  const buttons: MessageActionRowComponentBuilder[] = [];

  if (full) {
    const winRatio = (duelist.score?.total_duels > 0 ? Math.floor((duelist.score?.total_wins / duelist.score?.total_duels) * 100) : null);
    embed.addFields(
      {
        name: "Honour",
        value: `${duelist.score?.honour / 10} ${badge}`,
        inline: true,
      },
      {
        name: "Duels",
        value: `${duelist.score?.total_duels}`,
        inline: true,
      },
      {
        name: "Wins",
        value: `${duelist.score?.total_wins}`,
        inline: true,
      },
      {
        name: "Losses",
        value: `${duelist.score?.total_losses}`,
        inline: true,
      },
      {
        name: "Draws",
        value: `${duelist.score?.total_draws}`,
        inline: true,
      },
      {
        name: "Win Ratio",
        value: winRatio ? `${winRatio}%` : "-",
        inline: true,
      },
    );

    // Setup buttons
    buttons.push(new ButtonBuilder()
      .setCustomId(duelist_duels().builder(duelist.address, ChallengeState.Awaiting))
      .setEmoji('🤝')
      .setLabel('Awaiting')
      .setStyle(ButtonStyle.Secondary)
    );
    buttons.push(new ButtonBuilder()
      .setCustomId(duelist_duels().builder(duelist.address, ChallengeState.InProgress))
      .setEmoji('⚔️')
      .setLabel('Live Duels')
      .setStyle(ButtonStyle.Success)
    );
    buttons.push(new ButtonBuilder()
      .setCustomId(past_duels().builder(duelist.address))
      .setEmoji('🪦')
      .setLabel('Past Duels')
      .setStyle(ButtonStyle.Secondary)
    );
  }

  return {
    embeds: [embed],
    components: makeButtonsComponentsRow(...buttons),
  }
}

