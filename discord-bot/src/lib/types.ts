import type { PistolsEntity, PistolsModelType, PistolsSchemaModelNames } from '@underware/pistols-sdk/pistols/node';

export type SdkSubscriptionCallbackResponse = {
  data?: PistolsEntity[]
  error?: Error
};

export const getEntityModel = <M extends PistolsModelType>(entity: PistolsEntity, modelName: PistolsSchemaModelNames): M | undefined => (
  entity?.models.pistols?.[modelName] as M
)

export const entityContainsModels = (entity: PistolsEntity, modelNames: PistolsSchemaModelNames[]): boolean => (
  modelNames.some(modelName => Boolean(entity?.models.pistols?.[modelName]))
)
