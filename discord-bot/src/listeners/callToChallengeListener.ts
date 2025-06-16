import { Listener, container } from '@sapphire/framework';
import { DojoSapphireClient } from '../lib/client.js';
import { callToChallengeSub } from '../pistols/callToChallengeSub.js';
import { models } from '@underware/pistols-sdk/pistols/gen';
import type * as torii from '@dojoengine/torii-wasm/node';
import { bigintToAddress, bigintToDecimal } from '@underware/pistols-sdk/utils';

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
    const socialLink: models.PlayerSocialLinkEvent | undefined = this.container.pistols_players[playerAddress];
    // this.container.logger.info(`>>>> GOT CALL TO CHALLENGE:`, callToChallenge, socialLink);
    this.container.logger.info(`>>>> GOT CALL TO CHALLENGE [${playerAddress}]:`, socialLink?.user_name, socialLink ? callToChallenge : 'ignored');
    if (socialLink) {
      this.container.logger.info(`--- message to:`, socialLink.user_name);
      const url = `https://play.pistols.gg/tavern?duel=${bigintToDecimal(callToChallenge.duel_id)}`;
      const message = `You have a new duel waiting for you!\n${url}`;
      this.container.client.users.send(socialLink.user_id, message);
    }
  }
}
