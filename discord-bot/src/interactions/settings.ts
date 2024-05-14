import type { AnySelectMenuInteraction, ButtonInteraction, InteractionReplyOptions } from 'discord.js';
import { setGuild } from '../utils/db_guilds.js';
import { formatSettingsMessage } from '../formatters/admin.js';
// import { sign } from 'jsonwebtoken';


const _set = async (interaction: ButtonInteraction | AnySelectMenuInteraction, params: any) => {
  const user_id = interaction.user.id;
  const guild_id = interaction.guild?.id ?? '';
  const response = await setGuild({
    ...params,
    user_id,
    guild_id,
  })
  if (!response) {
    return { content: `Error updating settings!` };
  }
  return await formatSettingsMessage(guild_id);
}

//------------------------------
// settings_channel
//
export const settings_channel = () => {
  const customId = 'settings_channel';
  const builder = () => {
    return `${customId}`;
  }
  const run = async (interaction: AnySelectMenuInteraction, options: string[]): Promise<InteractionReplyOptions> => {
    const [customId, notifications_channel_id] = options;
    return _set(interaction, {
      notifications_channel_id,
    });
  }
  return {
    customId,
    ephemeral: true,
    builder,
    run,
  }
}

export const settings_challenges_notifications = () => {
  const customId = 'settings_challenges_notifications';
  const builder = (enabled: number) => {
    return `${customId};${enabled}`;
  }
  const run = async (interaction: ButtonInteraction, options: string[]): Promise<InteractionReplyOptions> => {
    const [customId, enabled] = options;
    return _set(interaction, {
      challenges_notifications: Boolean(parseInt(enabled)),
    });
  }
  return {
    customId,
    ephemeral: true,
    builder,
    run,
  }
}
export const settings_new_duelist_notifications = () => {
  const customId = 'settings_new_duelist_notifications';
  const builder = (enabled: number) => {
    return `${customId};${enabled}`;
  }
  const run = async (interaction: ButtonInteraction, options: string[]): Promise<InteractionReplyOptions> => {
    const [customId, enabled] = options;
    return _set(interaction, {
      new_duelist_notifications: Boolean(parseInt(enabled)),
    });
  }
  return {
    customId,
    ephemeral: true,
    builder,
    run,
  }
}

export const settings_duelists_turn_notifications = () => {
  const customId = 'settings_duelists_turn_notifications';
  const builder = (enabled: number) => {
    return `${customId};${enabled}`;
  }
  const run = async (interaction: ButtonInteraction, options: string[]): Promise<InteractionReplyOptions> => {
    const [customId, enabled] = options;
    return _set(interaction, {
      duelists_turn_notifications: Boolean(parseInt(enabled)),
    });
  }
  return {
    customId,
    ephemeral: true,
    builder,
    run,
  }
}


