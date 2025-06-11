import { Listener } from '@sapphire/framework';
import { DojoSapphireClient } from '../lib/client.js';
import { historicalEventsSub } from '../pistols/historicalEventsSub.js';
import { models } from '@underware/pistols-sdk/pistols/gen';
import type * as torii from '@dojoengine/torii-wasm/node';

import EventEmitter from 'node:events';
const _emitter = new EventEmitter();

export class PlayerActivityEventListener extends Listener {
  sub: torii.Subscription | null = null;
  public constructor(context: Listener.LoaderContext, options: Listener.Options) {
    super(context, {
      ...options,
      emitter: _emitter,
      event: 'activity'
    });
    // DISABLED
    // this.container.logger.info(`[start] PlayerActivityEventListener...`);
    // historicalEventsSub(this.container.sdk, _emitter, 'activity').then((sub) => {
    //   this.sub = sub;
    // });
  }

  // public override async destroy() {
  //   this.sub?.cancel();
  // }

  public override async run(activity: models.PlayerActivityEvent) {
    // const { username, id } = client.user!;
    this.container.logger.info(`>>>> GOT ACTIVITY:`, activity);
  }
}
