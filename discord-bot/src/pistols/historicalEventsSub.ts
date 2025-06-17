import EventEmitter from 'node:events';
import { CairoCustomEnum } from 'starknet';
import { container } from '@sapphire/framework';
import { SDK } from '@dojoengine/sdk/node';
import { PistolsClauseBuilder, PistolsHistoricalQueryBuilder, getEntityModel } from '@underware/pistols-sdk/pistols/node';
import type { PistolsSchemaType, SdkSubscriptionCallbackResponse } from '@underware/pistols-sdk/pistols/node';
import { models, constants } from '@underware/pistols-sdk/pistols/gen';
import type * as torii from '@dojoengine/torii-wasm/node';

export const historicalEventsSub = async (
  sdk: SDK<PistolsSchemaType>,
  emitter: EventEmitter,
  eventType: string
): Promise<torii.Subscription> => {

  const query: PistolsHistoricalQueryBuilder = new PistolsHistoricalQueryBuilder()
    .withClause(
      new PistolsClauseBuilder().keys(
        ['pistols-PlayerActivityEvent', 'pistols-TrophyProgression'],
        [], 'VariableLen'
      ).build()
    )
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

      // const entity = response.data?.pop();
      // if (entity && entity.entityId !== '0x0') {
      //   container.logger.info(`--- HISTORICAL sub:`, Object.keys(entity.models.pistols ?? {}));

      //   // activity events
      //   // {
      //   //   is_public: true,
      //   //   player_address: "0x057c54434905c896cc163358a9057f91b5e3e6a4f60b5a4bef3fdd77c2dc91aa",
      //   //   activity: "MovesRevealed",
      //   //   timestamp: 1746824284,
      //   //   identifier: "0x00000000000000000000000000000000000000000000000000000000000000e4",
      //   // }

      //   // WORKS!! > enable when needed
      //   const activity = getEntityModel<models.PlayerActivityEvent>(entity, 'PlayerActivityEvent');
      //   if (activity) {
      //     const action_id = parseEnumVariant<constants.Activity>(activity.activity);
      //     container.logger.info(`--- HISTORICAL PlayerActivityEvent: [${action_id}]`, activity);
      //     // if (action_id === constants.Activity.TutorialFinished) {
      //     // }
      //     emitter.emit(eventType, activity);
      //   }
      // }
    },
  });

  return sub;
};
