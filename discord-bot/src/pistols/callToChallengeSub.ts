import EventEmitter from 'node:events';
import { container } from '@sapphire/framework';
import { SDK } from '@dojoengine/sdk/node';
import { PistolsClauseBuilder, PistolsQueryBuilder, getEntityModel } from '@underware/pistols-sdk/pistols/node';
import type { PistolsSchemaType, SdkSubscriptionCallbackResponse } from '@underware/pistols-sdk/pistols/node';
import { models } from '@underware/pistols-sdk/pistols/gen';
import type * as torii from '@dojoengine/torii-wasm/node';

export const callToChallengeSub = async (
  sdk: SDK<PistolsSchemaType>,
  emitter: EventEmitter,
  eventType: string
): Promise<torii.Subscription> => {

  const query: PistolsQueryBuilder = new PistolsQueryBuilder()
    .withClause(
      new PistolsClauseBuilder().keys(
        ['pistols-CallToChallengeEvent'],
        [], 'VariableLen'
      ).build()
    )
    .withEntityModels([
      'pistols-CallToChallengeEvent',
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
        container.logger.info(`--- CALL TO CHALLENGE got:`, Object.keys(entity.models.pistols ?? {}));

        // activity events
        // {
        //   is_public: true,
        //   player_address: "0x057c54434905c896cc163358a9057f91b5e3e6a4f60b5a4bef3fdd77c2dc91aa",
        //   activity: "MovesRevealed",
        //   timestamp: 1746824284,
        //   identifier: "0x00000000000000000000000000000000000000000000000000000000000000e4",
        // }
        const callToChallenge = getEntityModel<models.CallToChallengeEvent>(entity, 'CallToChallengeEvent');
        // container.logger.info(`--- CallToChallengeEvent: [${bigintToAddress(callToChallenge.player_address)}]`, callToChallenge);
        emitter.emit(eventType, callToChallenge);
      }
    },
  });

  return sub;
};
