import { Listener } from '@sapphire/framework';
import { DojoSapphireClient } from '../lib/client.js';
import { eventsSub } from '../pistols/eventsSub.js';
import { models } from '@underware/pistols-sdk/pistols/gen';
import type * as torii from '@dojoengine/torii-wasm/node';

import EventEmitter from 'node:events';
const _emitter = new EventEmitter();

export class CallToActionEventListener extends Listener {
  sub: torii.Subscription | null = null;
  public constructor(context: Listener.LoaderContext, options: Listener.Options) {
    super(context, {
      ...options,
      emitter: _emitter,
      event: 'event'
    });
    this.container.logger.info(`[start] CallToActionEventListener...`);
    //@ts-ignore
    eventsSub(this.container.sdk, _emitter, 'event').then((sub) => {
      this.sub = sub;
    });
  }

  // public override async destroy() {
  //   this.sub?.cancel();
  // }

  public override async run(client: DojoSapphireClient, callToAction: models.CallToActionEvent) {
    // const { username, id } = client.user!;
    this.container.logger.info(`>>>> GOT CALL TO ACTION:`, callToAction);
  }
}
