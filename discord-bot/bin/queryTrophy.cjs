import { w3cwebsocket } from 'websocket';
import { init } from '@dojoengine/sdk/node';
import { PistolsHistoricalQueryBuilder, PistolsQueryBuilder, PistolsClauseBuilder } from '@underware/pistols-sdk/pistols/node';
import { dojoConfig, starknerDomain } from '../src/dojoConfig.js';
import { feltToString } from '@underware/pistols-sdk/starknet';
// import type * as torii from "@dojoengine/torii-wasm/types";
// import { env } from './env.ts';

// Those lines are require so that websocket works.
// @ts-ignore
global.Websocket = w3cwebsocket;
// @ts-ignore
global.WorkerGlobalScope = global;

const sdk = await init({
  client: {
    toriiUrl: dojoConfig.toriiUrl,
    relayUrl: dojoConfig.relayUrl,
    worldAddress: dojoConfig.manifest.world.address,
  },
  domain: {
    ...starknerDomain,
    name: 'pistols_gg_quests',
  },
  // identity: env.ACCOUNT_ADDRESS,
  // signer: SigningKey.fromSecretScalar(env.ACCOUNT_PRIVATE_KEY),
});
// console.log('-- OK!');



let query = new PistolsHistoricalQueryBuilder()
  // .withClause(
  //   // new PistolsClauseBuilder().keys(
  //   //   ["pistols-TrophyProgression"],
  //   //   [undefined]
  //   // ).build()
  //   new PistolsClauseBuilder().where(
  //     // "pistols-TrophyProgression", "activity", "Eq", "PackStarter",
  //     "pistols-TrophyProgression", "player_address", "Eq", "0x03b45e864ba34694658e1b5e8f8d97d6ec1233363bd2ce070897d19ea3a68467",
  //   ).build()
  // )
  .withEntityModels([
    "pistols-TrophyProgression",
  ])
  .withLimit(1000)
  .includeHashedKeys()

const taskId = "BloodBath";


let results = []
let pageNumber = 0;
do {
  const events = await sdk.getEventMessages({ query });
  const items = events.getItems();
  console.log(`GOT events page[${pageNumber}]: ${items.length}, cursor: ${events.cursor}`);

  results = results.concat(items
    .filter(item => feltToString(item.models.pistols.TrophyProgression.task_id) === taskId)
    .map(item => ({
      timestamp: item.models.pistols.TrophyProgression.time,
      task_id: feltToString(item.models.pistols.TrophyProgression.task_id),
      player_address: item.models.pistols.TrophyProgression.player_id,
    })));

  // get next page
  query = events.cursor ? query.withCursor(events.cursor) : null;
  pageNumber++;
} while (query != null)

console.log(`event\ttimestamp\tdate\tplayer_address`);
results.forEach(result => {
  console.log(`${result.task_id}\t${result.timestamp}\t${new Date(result.timestamp * 1000).toISOString()}\t${result.player_address}`);
});
console.log(`total:\t${results.length}`);

// exit
process.exit(0);

