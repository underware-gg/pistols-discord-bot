import { EmbedBuilder, BaseMessageOptions, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageActionRowComponentBuilder } from "discord.js";
import { Colors } from "../utils/constants.js";

export const makeButtonsComponentsRow = (...buttons: MessageActionRowComponentBuilder[]) => {
  if (buttons.length == 0) return [];
  const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(...buttons);
  return [row]
}

export function formatNoDuelsFound(): BaseMessageOptions {
  const embed = new EmbedBuilder()
    .setTitle(`No duels found!`)
    .setColor(Colors.Negative)
  const button1 = new ButtonBuilder()
    .setURL(process.env.CLIENT_URL || '')
    .setEmoji('⚔️')
    .setLabel('Go Duel!!!')
    .setStyle(ButtonStyle.Link);
  return {
    embeds: [embed],
    components: makeButtonsComponentsRow(button1),
  }
}

export function formatAccountNotLinked(): BaseMessageOptions {
  const contents = [
    `Link your Duelist to your Discord account and get ready to...`,
    `* Check your current Duels`,
    `* Interact with the game from this server`,
    `* Get real-time duels notifications`,
  ];
  const embed = new EmbedBuilder()
    .setTitle(`Discord account not connected!`)
    .setColor(Colors.Negative)
    .setDescription(contents.join('\n'))
  const button1 = new ButtonBuilder()
    .setURL(process.env.SOCIAL_APP_URL || process.env.CLIENT_URL || '')
    .setEmoji('👑')
    .setLabel('Link your Duelist')
    .setStyle(ButtonStyle.Link);
  return {
    embeds: [embed],
    components: makeButtonsComponentsRow(button1),
  }
}

