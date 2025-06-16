import EventEmitter from 'node:events';
import { SDK } from '@dojoengine/sdk/node';
import { container } from '@sapphire/framework';
import type { PistolsEntity, PistolsSchemaType } from '@underware/pistols-sdk/pistols/node';
import { PistolsClauseBuilder, PistolsQueryBuilder } from '@underware/pistols-sdk/pistols/node';
import { bigintToAddress, bigintToHex } from '@underware/pistols-sdk/utils';
import { models, constants } from '@underware/pistols-sdk/pistols/gen';
import { getEntityModel, type SdkSubscriptionCallbackResponse } from '../lib/types.js';
import type * as torii from '@dojoengine/torii-wasm/node';

export const socialLinkSub = async (
  sdk: SDK<PistolsSchemaType>,
  emitter: EventEmitter,
  eventType: string
): Promise<torii.Subscription> => {

  const query: PistolsQueryBuilder = new PistolsQueryBuilder()
    .withClause(
      new PistolsClauseBuilder().compose().or([
        // All Discord linked players
        new PistolsClauseBuilder().keys(
          ['pistols-PlayerSocialLinkEvent'],
          [
            undefined,
            bigintToHex(constants.getSocialPlatformValue(constants.SocialPlatform.Discord) as number)
          ],
          'FixedLen'
        ),
        // All Discord settings
        new PistolsClauseBuilder().keys(
          ['pistols-PlayerSettingEvent'],
          [
            undefined,
            bigintToHex(constants.getPlayerSettingValue(constants.PlayerSetting.OptOutNotifications) as number),
            bigintToHex(constants.getSocialPlatformValue(constants.SocialPlatform.Discord) as number),
          ],
          'FixedLen'
        ),
      ]).build()
    )
    .withEntityModels([
      'pistols-PlayerSocialLinkEvent',
      'pistols-PlayerSettingEvent',
    ])
    .includeHashedKeys()
    .withLimit(1000)

  // emit entity models to the Listener
  const _emit = (entity: PistolsEntity) => {
    const socialLink = getEntityModel<models.PlayerSocialLinkEvent>(entity, 'PlayerSocialLinkEvent');
    if (socialLink) {
      emitter.emit(eventType, { 'PlayerSocialLinkEvent': socialLink });
    }
    const setting = getEntityModel<models.PlayerSettingEvent>(entity, 'PlayerSettingEvent');
    if (setting) {
      emitter.emit(eventType, { 'PlayerSettingEvent': setting });
    }
  };

  // Subscribe for events
  const [entities, sub] = await sdk.subscribeEventQuery({
    query,
    callback: (response: SdkSubscriptionCallbackResponse) => {
      if (response.error) {
        container.logger.error(`[pistols/historicalEventsListener] error:`, response.error);
        return;
      }
      // Process new event
      const entity = response.data?.pop();
      if (entity && entity.entityId !== '0x0') {
        container.logger.info(`--- SOCIAL LINK sub:`, Object.keys(entity.models.pistols ?? {}));
        _emit(entity);
      }
    },
  });

  // Process existing events
  entities.getItems().forEach((entity: PistolsEntity) => {
    container.logger.info(`--- SOCIAL LINK get:`, Object.keys(entity.models.pistols ?? {}));
    _emit(entity);
  });

  return sub;
};
