import { Listener, container } from '@sapphire/framework';
import { DojoSapphireClient } from '../lib/client.js';
import { callToActionSub } from '../pistols/callToActionSub.js';
import { models } from '@underware/pistols-sdk/pistols/gen';
import type * as torii from '@dojoengine/torii-wasm/node';
import { bigintToAddress, bigintToDecimal } from '@underware/pistols-sdk/utils';

const _eventName = 'CallToActionEvent';

export class CallToActionEventListener extends Listener {
  sub: torii.Subscription | null = null;
  public constructor(context: Listener.LoaderContext, options: Listener.Options) {
    super(context, {
      ...options,
      emitter: container.pistols_emitter,
      event: _eventName
    });
    this.container.logger.info(`[start] CallToActionEventListener...`);
    callToActionSub(this.container.sdk, container.pistols_emitter, _eventName).then((sub) => {
      this.sub = sub;
    });
  }

  // public override async destroy() {
  //   this.sub?.cancel();
  // }

  public override async run(callToAction: models.CallToActionEvent) {
    const playerAddress = bigintToAddress(callToAction.player_address);
    const socialLink: models.PlayerSocialLinkEvent | undefined = this.container.pistols_players[playerAddress];
    // this.container.logger.info(`>>>> GOT CALL TO ACTION:`, callToAction, socialLink);
    this.container.logger.info(`>>>> GOT CALL TO ACTION [${playerAddress}]:`, socialLink?.user_name, socialLink ? callToAction : 'ignored');
    if (socialLink) {
      this.container.logger.info(`--- message to:`, socialLink.user_name);
      const url = `https://play.pistols.gg/tavern?duel=${bigintToDecimal(callToAction.duel_id)}`;
      const message = `You have a new duel waiting for you!\n${url}`;
      this.container.client.users.send(socialLink.user_id, message);
    }
  }
}
