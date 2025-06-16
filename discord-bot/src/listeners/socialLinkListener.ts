import { Listener, container } from '@sapphire/framework';
import { bigintToAddress } from '@underware/pistols-sdk/utils';
import { parseCustomEnum } from '@underware/pistols-sdk/starknet';
import { models, constants } from '@underware/pistols-sdk/pistols/gen';
import type * as torii from '@dojoengine/torii-wasm/node';
import { socialLinkSub } from '../pistols/socialLinkSub.js';
import { PlayerSettings } from '../lib/client.js';

const _eventName = 'PlayerSocialLinkEvent';

type SocialLinkEmittedData = {
  PlayerSocialLinkEvent: models.PlayerSocialLinkEvent;
  PlayerSettingEvent: models.PlayerSettingEvent;
}

export class SocialLinkEventListener extends Listener {
  sub: torii.Subscription | null = null;
  public constructor(context: Listener.LoaderContext, options: Listener.Options) {
    super(context, {
      ...options,
      emitter: container.pistols_emitter,
      event: _eventName
    });
    this.container.logger.info(`[start] SocialLinkEventListener...`);
    socialLinkSub(this.container.sdk, container.pistols_emitter, _eventName).then((sub) => {
      this.sub = sub;
    });
  }

  // public override async destroy() {
  //   this.sub?.cancel();
  // }

  public override async run(data: SocialLinkEmittedData) {
    if (data.PlayerSocialLinkEvent) {
      const player_address = bigintToAddress(data.PlayerSocialLinkEvent.player_address);
      this.container.logger.info(`>>>> GOT SOCIAL LINK [${player_address}]:`, data.PlayerSocialLinkEvent.user_name);
      this.container.pistols_players[player_address] = data.PlayerSocialLinkEvent
    }
    if (data.PlayerSettingEvent) {
      // get current setting for this player
      const player_address = bigintToAddress(data.PlayerSettingEvent.player_address);
      let setting: PlayerSettings = this.container.pistols_settings[player_address] ?? {};
      //
      // parse setting from event
      const {
        variant: settingVariant,  // 'OptOutNotifications'
        value: settingValue,      // 'Discord'
      } = parseCustomEnum<constants.PlayerSetting, constants.SocialPlatform>(data.PlayerSettingEvent.setting);
      //
      // OptOutNotifications, value is Boolean
      if (settingVariant === constants.PlayerSetting.OptOutNotifications) {
        const {
          variant: optedOutVariant, // 'Boolean'
          value: optedOutValue,     // true | false
        } = parseCustomEnum<constants.PlayerSettingValue, boolean>(data.PlayerSettingEvent.value);
        setting[constants.PlayerSetting.OptOutNotifications] = optedOutValue;
      }
      this.container.logger.info(`>>>> GOT SETTING [${player_address}]:`, setting);
      this.container.pistols_settings[player_address] = setting;
    }
  }
}
