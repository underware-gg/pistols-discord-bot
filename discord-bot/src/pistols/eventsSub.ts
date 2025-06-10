import { SDK } from '@dojoengine/sdk/node';
import { container } from '@sapphire/framework';
import { PistolsSchemaType, PistolsEntity, PistolsQueryBuilder } from '@underware/pistols-sdk/pistols/node';
import { bigintToAddress } from '@underware/pistols-sdk/utils';
import { models } from '@underware/pistols-sdk/pistols/gen';
import EventEmitter from 'node:events';
import type * as torii from "@dojoengine/torii-wasm/types";

type SdkSubscriptionCallbackResponse = {
  data?: PistolsEntity[]
  error?: Error
};

export const eventsSub = async (
  sdk: SDK<PistolsSchemaType>,
  emitter: EventEmitter,
  eventType: string
): Promise<torii.Subscription> => {

  const query: PistolsQueryBuilder = new PistolsQueryBuilder()
    .withEntityModels([
      'pistols-CallToActionEvent',
    ])
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
        const callToAction = entity.models?.pistols?.CallToActionEvent as models.CallToActionEvent;
        if (callToAction) {
          // const action_id = parseEnumVariant<constants.Activity>(call.action);
          container.logger.info(`--- HISTORICAL CallToActionEvent: [${bigintToAddress(callToAction.player_address)}]`, callToAction);
          // if (action_id === constants.Activity.TutorialFinished) {
          // }
          emitter.emit(eventType, callToAction);
        }
      }
    },
  });

  return sub;
};
