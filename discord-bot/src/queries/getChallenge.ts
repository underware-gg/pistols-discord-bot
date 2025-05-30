import { BigNumberish } from 'starknet';
import { SDK } from '@dojoengine/sdk/node';
import { PistolsSchemaType, PistolsEntity, PistolsToriiResponse, PistolsQueryBuilder, PistolsClauseBuilder } from '@underware/pistols-sdk/pistols/node';
import { bigintToDecimal, bigintToAddress } from '@underware/pistols-sdk/utils';
import { models } from '@underware/pistols-sdk/pistols/gen';

export const getChallenge = async (sdk: SDK<PistolsSchemaType>, duelId: BigNumberish): Promise<models.Challenge | null> => {

  const query: PistolsQueryBuilder = new PistolsQueryBuilder()
    .withClause(
      new PistolsClauseBuilder().keys(
        ["pistols-Challenge"],
        [bigintToAddress(duelId)]
      ).build()
    )
    .withEntityModels([
      "pistols-Challenge",
    ])
    .includeHashedKeys()

  //@ts-ignore
  const events: PistolsToriiResponse = await sdk.getEntities({
    query: query,
  });
  const items: PistolsEntity[] = events.getItems();
  // console.log(`Challenge(${bigintToDecimal(duelId)}) [${items.length}]`, items);

  const challenge = (items[0]?.models?.pistols?.Challenge as models.Challenge) || null;
  console.log(`=== Challenge(${bigintToDecimal(duelId)}) [${items.length}]`, challenge);

  return challenge;
};
