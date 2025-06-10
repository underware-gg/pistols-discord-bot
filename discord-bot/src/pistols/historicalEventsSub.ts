import { SDK } from '@dojoengine/sdk/node';
import { container } from '@sapphire/framework';
import { PistolsSchemaType, PistolsEntity, PistolsHistoricalQueryBuilder } from '@underware/pistols-sdk/pistols/node';
import { parseEnumVariant } from '@underware/pistols-sdk/starknet';
import { models, constants } from '@underware/pistols-sdk/pistols/gen';
import EventEmitter from 'node:events';
import type * as torii from '@dojoengine/torii-wasm/node';

type SdkSubscriptionCallbackResponse = {
  data?: PistolsEntity[]
  error?: Error
};

export const historicalEventsSub = async (
  sdk: SDK<PistolsSchemaType>,
  emitter: EventEmitter,
  eventType: string
): Promise<torii.Subscription> => {

  const query: PistolsHistoricalQueryBuilder = new PistolsHistoricalQueryBuilder()
    .withEntityModels([
      'pistols-PlayerActivityEvent',
      'pistols-TrophyProgression',
    ])
    .withDirection('Backward')
    .withLimit(1)

  const [entities, sub] = await sdk.subscribeEventQuery({
    query,
    callback: (response: SdkSubscriptionCallbackResponse) => {
      if (response.error) {
        container.logger.error(`[pistols/historicalEventsListener] error:`, response.error);
        return;
      }

      const entity = response.data?.pop();
      if (entity && entity.entityId !== '0x0') {
        container.logger.info(`--- HISTORICAL got:`, Object.keys(entity.models.pistols ?? {}));

        // activity events
        // {
        //   is_public: true,
        //   player_address: "0x057c54434905c896cc163358a9057f91b5e3e6a4f60b5a4bef3fdd77c2dc91aa",
        //   activity: "MovesRevealed",
        //   timestamp: 1746824284,
        //   identifier: "0x00000000000000000000000000000000000000000000000000000000000000e4",
        // }
        const activity = entity.models?.pistols?.PlayerActivityEvent as models.PlayerActivityEvent;
        if (activity) {
          const action_id = parseEnumVariant<constants.Activity>(activity.activity);
          container.logger.info(`--- HISTORICAL PlayerActivityEvent: [${action_id}]`, activity);
          // if (action_id === constants.Activity.TutorialFinished) {
          // }
          emitter.emit(eventType, activity);
        }
      }
    },
  });

  return sub;
};
