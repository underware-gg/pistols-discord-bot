import { EmbedBuilder, BaseMessageOptions, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder, ChannelSelectMenuBuilder, ChannelType } from "discord.js";
import { Colors } from "../utils/constants.js";
import { makeButtonsComponentsRow } from "./messages.js";
import * as settings from "../interactions/settings.js";
import { Guild, fetchGuild } from "../utils/fetch_guilds.js";

const _setting_button = (label: string, builder: (enabled: number) => string, enabled: boolean | null): ButtonBuilder => {
  return new ButtonBuilder()
    .setCustomId(builder(enabled ? 0 : 1 ?? ''))
    .setLabel(label)
    .setEmoji(enabled === false ? '🔕' : '🔔')
    .setStyle(enabled === null ? ButtonStyle.Secondary : enabled ? ButtonStyle.Success : ButtonStyle.Danger)
    .setDisabled(enabled === null)
}

export async function formatSettingsMessage(guild_id: string | null): Promise<BaseMessageOptions> {
  const guild: Guild | null = guild_id ? await fetchGuild(guild_id) : null;

  const descriptions = [
    `Select the Notifications Channel and which notifications are enabled`,
    `* **New Challenges**: New challenges are created, accepted and finished`,
    `* **New Duelists**: New duelists register in the game`,
    `* **Duelists Turn**: When a Duelist need to make a move (private to the Duelist)`,
  ]

  const embed = new EmbedBuilder()
    .setTitle(`Notifications Settings`)
    .setDescription(descriptions.join('\n'))
    .setColor(Colors.Dark)

  const buttons1: MessageActionRowComponentBuilder[] = [
    new ChannelSelectMenuBuilder()
      .setCustomId(settings.settings_channel().builder())
      .setPlaceholder('Notifications Channel')
      .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
      .setDefaultChannels(guild?.notifications_channel_id ? [guild.notifications_channel_id] : [])
  ];
  const buttons2: MessageActionRowComponentBuilder[] = [
    _setting_button('New Challenges',
      settings.settings_challenges_notifications().builder,
      guild?.challenges_notifications ?? null,
    ),
    _setting_button('New Duelists',
      settings.settings_new_duelist_notifications().builder,
      guild?.new_duelist_notifications ?? null,
    ),
    _setting_button('Duelists Turn',
      settings.settings_duelists_turn_notifications().builder,
      guild?.duelists_turn_notifications ?? null,
    ),
  ];

  return {
    embeds: [embed],
    components: [
      ...makeButtonsComponentsRow(...buttons1),
      ...makeButtonsComponentsRow(...buttons2),
    ]
  }
}
