import { w3cwebsocket } from 'websocket';
import { init } from '@dojoengine/sdk/node';
import { PistolsHistoricalQueryBuilder, PistolsQueryBuilder, PistolsClauseBuilder } from '@underware/pistols-sdk/pistols/node';
import { dojoConfig, starknerDomain } from '../src/dojoConfig.js';
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
  //   //   ["pistols-PlayerActivityEvent"],
  //   //   [undefined]
  //   // ).build()
  //   new PistolsClauseBuilder().where(
  //     "pistols-PlayerActivityEvent", "activity", "Eq", activityName,
  //     // "pistols-PlayerActivityEvent", "player_address", "Eq", "0x03b45e864ba34694658e1b5e8f8d97d6ec1233363bd2ce070897d19ea3a68467",
  //   ).build()
  // )
  .withEntityModels([
    "pistols-PlayerActivityEvent",
  ])
  .withLimit(1000)
  .includeHashedKeys()


// const activityName = "PackStarter";
const activityName = "ChallengeResolved";
// const activityName = "TutorialFinished";


let results = []
let pageNumber = 0;
do {
  const events = await sdk.getEventMessages({ query });
  const items = events.getItems();
  console.log(`GOT events page[${pageNumber}]: ${items.length}, cursor: ${events.cursor}`);

  results = results.concat(items
    .filter(item => item.models.pistols.PlayerActivityEvent.activity === activityName)
    .map(item => ({
      timestamp: item.models.pistols.PlayerActivityEvent.timestamp,
      activity: item.models.pistols.PlayerActivityEvent.activity,
      player_address: item.models.pistols.PlayerActivityEvent.player_address,
    })));

  // get next page
  query = events.cursor ? query.withCursor(events.cursor) : null;
  pageNumber++;
} while (query != null)

console.log(`event\ttimestamp\tdate\tplayer_address`);
results.forEach(result => {
  console.log(`${result.activity}\t${result.timestamp}\t${new Date(result.timestamp * 1000).toISOString() }\t${result.player_address}`);
});
console.log(`total:\t${results.length}`);


// exit
process.exit(0);