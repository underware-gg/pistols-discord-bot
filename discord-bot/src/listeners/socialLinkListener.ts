import { Listener, container } from '@sapphire/framework';
import { DojoSapphireClient } from '../lib/client.js';
import { socialLinkSub } from '../pistols/socialLinkSub.js';
import { bigintToAddress } from '@underware/pistols-sdk/utils';
import { models } from '@underware/pistols-sdk/pistols/gen';
import type * as torii from '@dojoengine/torii-wasm/node';

const _eventName = 'PlayerSocialLinkEvent';

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

  public override async run(socialLink: models.PlayerSocialLinkEvent) {
    // this.container.logger.info(`>>>> GOT SOCIAL LINK:`, socialLink);
    this.container.logger.info(`>>>> GOT SOCIAL LINK [${socialLink.player_address}]:`, socialLink.user_name);
    this.container.pistols_players[bigintToAddress(socialLink.player_address)] = socialLink
  }
}
