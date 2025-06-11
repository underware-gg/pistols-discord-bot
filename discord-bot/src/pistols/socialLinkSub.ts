import EventEmitter from 'node:events';
import { SDK } from '@dojoengine/sdk/node';
import { container } from '@sapphire/framework';
import type { PistolsEntity, PistolsSchemaType } from '@underware/pistols-sdk/pistols/node';
import { PistolsClauseBuilder, PistolsQueryBuilder } from '@underware/pistols-sdk/pistols/node';
import { bigintToAddress } from '@underware/pistols-sdk/utils';
import { models } from '@underware/pistols-sdk/pistols/gen';
import { getEntityModel, type SdkSubscriptionCallbackResponse } from '../lib/types.js';
import type * as torii from '@dojoengine/torii-wasm/node';

export const socialLinkSub = async (
  sdk: SDK<PistolsSchemaType>,
  emitter: EventEmitter,
  eventType: string
): Promise<torii.Subscription> => {

  const query: PistolsQueryBuilder = new PistolsQueryBuilder()
    .withClause(
      new PistolsClauseBuilder().where(
        'pistols-PlayerSocialLinkEvent',
        'social_platform',
        'Eq',
        'Discord'
      ).build()
    )
    .withEntityModels([
      'pistols-PlayerSocialLinkEvent',
    ])
    .includeHashedKeys()
    .withLimit(1000)

  const [entities, sub] = await sdk.subscribeEventQuery({
    query,
    callback: (response: SdkSubscriptionCallbackResponse) => {
      if (response.error) {
        container.logger.error(`[pistols/historicalEventsListener] error:`, response.error);
        return;
      }

      const entity = response.data?.pop();
      if (entity && entity.entityId !== '0x0') {
        container.logger.info(`--- SOCIAL LINK sub:`, Object.keys(entity.models.pistols ?? {}));
        const socialLink = getEntityModel<models.PlayerSocialLinkEvent>(entity, 'PlayerSocialLinkEvent');
        if (socialLink) {
          emitter.emit(eventType, socialLink);
        }
      }
    },
  });

  entities.getItems().forEach((entity: PistolsEntity) => {
    const socialLink = getEntityModel<models.PlayerSocialLinkEvent>(entity, 'PlayerSocialLinkEvent');
    if (socialLink) {
      emitter.emit(eventType, socialLink);
    }
  });

  return sub;
};
