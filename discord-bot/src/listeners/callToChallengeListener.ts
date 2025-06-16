import { Listener, container } from '@sapphire/framework';
import { bigintToAddress, bigintToDecimal } from '@underware/pistols-sdk/utils';
import { models, constants } from '@underware/pistols-sdk/pistols/gen';
import type * as torii from '@dojoengine/torii-wasm/node';
import { callToChallengeSub } from '../pistols/callToChallengeSub.js';
import { PlayerSettings } from '../lib/client.js';

const _eventName = 'CallToChallengeEvent';

export class CallToChallengeEventListener extends Listener {
  sub: torii.Subscription | null = null;
  public constructor(context: Listener.LoaderContext, options: Listener.Options) {
    super(context, {
      ...options,
      emitter: container.pistols_emitter,
      event: _eventName
    });
    this.container.logger.info(`[start] CallToChallengeEventListener...`);
    callToChallengeSub(this.container.sdk, container.pistols_emitter, _eventName).then((sub) => {
      this.sub = sub;
    });
  }

  // public override async destroy() {
  //   this.sub?.cancel();
  // }

  public override async run(callToChallenge: models.CallToChallengeEvent) {
    const playerAddress = bigintToAddress(callToChallenge.player_address);
    const action = callToChallenge.action;
    const duelId = bigintToDecimal(callToChallenge.duel_id);
    //
    // find player social link
    const socialLink: models.PlayerSocialLinkEvent | undefined = this.container.pistols_players[playerAddress];
    if (!socialLink) {
      this.container.logger.info(`>>>> GOT CALL TO CHALLENGE [${playerAddress}][${duelId}][${action}]: unlinked player`);
      return;
    }
    // check opt-out
    const settings: PlayerSettings = this.container.pistols_settings[playerAddress] ?? {};
    if (settings[constants.PlayerSetting.OptOutNotifications] === true) {
      this.container.logger.info(`>>>> GOT CALL TO CHALLENGE [${playerAddress}][${duelId}][${action}]: opted out`);
      return;
    }
    this.container.logger.info(`>>>> GOT CALL TO CHALLENGE [${playerAddress}][${duelId}][${action}]: message to [${socialLink.user_name}]`);
    //
    // build message
    const url = `https://play.pistols.gg/tavern?duel=${bigintToDecimal(callToChallenge.duel_id)}`;
    const message = `You have a new duel waiting for you!\n${url}`;
    this.container.client.users.send(socialLink.user_id, message);
  }
}
