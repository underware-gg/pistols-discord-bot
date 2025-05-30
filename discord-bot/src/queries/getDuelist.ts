import { BigNumberish } from 'starknet';
import { SDK } from '@dojoengine/sdk/node';
import { PistolsSchemaType, PistolsEntity, PistolsToriiResponse, PistolsQueryBuilder, PistolsClauseBuilder } from '@underware/pistols-sdk/pistols/node';
import { bigintToDecimal, bigintToAddress } from '@underware/pistols-sdk/utils';
import { models } from '@underware/pistols-sdk/pistols/gen';

export const getDuelist = async (sdk: SDK<PistolsSchemaType>, duelistId: BigNumberish): Promise<models.Duelist | null> => {

  const query: PistolsQueryBuilder = new PistolsQueryBuilder()
    .withClause(
      new PistolsClauseBuilder().keys(
        ["pistols-Duelist"],
        [bigintToAddress(duelistId)]
      ).build()
    )
    .withEntityModels([
      "pistols-Duelist",
    ])
    .includeHashedKeys()

  //@ts-ignore
  const events: PistolsToriiResponse = await sdk.getEntities({
    query: query,
  });
  const items: PistolsEntity[] = events.getItems();
  // console.log(`Challenge(${bigintToDecimal(duelId)}) [${items.length}]`, items);

  const duelist = (items[0]?.models?.pistols?.Duelist as models.Duelist) || null;
  // console.log(`=== Duelist(${bigintToDecimal(duelistId)}) [${items.length}]`, duelist);

  return duelist;
};
