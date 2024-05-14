import { Listener, container } from '@sapphire/framework';
import { customEventSub, customEventEmitter } from "../queries/customEventSub.js";
import { fetchGuilds } from "../utils/db_guilds.js";
import { EventName } from "../utils/constants.js";
import { BaseMessageOptions } from 'discord.js';

customEventSub(EventName.NewChallengeEvent, 'challenges_notifications');
customEventSub(EventName.ChallengeAcceptedEvent, 'challenges_notifications');
customEventSub(EventName.ChallengeResolvedEvent, 'challenges_notifications');
customEventSub(EventName.DuelistRegistered, 'new_duelist_notifications');
customEventSub(EventName.DuelistTurnEvent, 'duelists_turn_notifications');

export class CustomEventsListener extends Listener {
  public constructor(context: Listener.LoaderContext, options: Listener.Options) {
    super(context, {
      ...options,
      emitter: customEventEmitter,
      event: 'custom_event',
    });
  }

  public async run(eventData: any) {
    const { eventName, settingsFlag, payload } = eventData;

    const guilds = await fetchGuilds();
    guilds.forEach((guild) => {
      const guildId = guild.guild_id;
      const channelId = guild.notifications_channel_id;
      //@ts-ignore
      const enabled = guild[settingsFlag];
      console.log(`+++ GUILDS`, guildId, channelId, enabled);
      if (guildId && channelId && enabled) {
        this.sendPayload(guildId, channelId, payload);
      }
    });
  }

  sendPayload(guildId: string, channelId: string, payload: BaseMessageOptions) {
    if (container.client.isReady()) {
      container.client.guilds.fetch(guildId).then((guild) => {
        guild.channels.fetch(channelId).then((channel) => {
          if (channel?.isTextBased()) {
            channel.send(payload);
          }
        });
      });
    }
  }
}
