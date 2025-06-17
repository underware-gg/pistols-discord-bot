import ws from 'websocket';
import type { StarknetDomain } from 'starknet';
import { createDojoConfig } from '@dojoengine/core';
import { NetworkId, getNetworkConfig, getManifest, makeStarknetDomain } from '@underware/pistols-sdk/pistols/config';
import type { DojoNetworkConfig } from '@underware/pistols-sdk/pistols/config';
import type { PistolsSchemaType } from '@underware/pistols-sdk/pistols/node';
import { type SDK, init } from '@dojoengine/sdk/node';
import * as ENV from './env.js';

// required for torii client websockets
// globalThis.global = globalThis;
// @ts-ignore
global.Websocket = ws.w3cwebsocket;
// @ts-ignore
global.WorkerGlobalScope = global;

// console.log('ENV:', ENV);
const networkId = ENV.NETWORK_ID as NetworkId ?? NetworkId.MAINNET;
const networkConfig: DojoNetworkConfig = getNetworkConfig(networkId, ENV);
const starknetDomain: StarknetDomain = makeStarknetDomain({ networkId });

// const game_contract = getContractByName(dojoAppConfig.manifest, dojoAppConfig.namespace, 'game');
// const duel_contract = getContractByName(dojoAppConfig.manifest, dojoAppConfig.namespace, 'duel_token');
// const duelist_contract = getContractByName(dojoAppConfig.manifest, dojoAppConfig.namespace, 'duelist_token');

const dojoConfig = createDojoConfig({
  manifest: getManifest({ networkId }),
  toriiUrl: networkConfig.toriiUrl,
  rpcUrl: networkConfig.rpcUrl,
});

const init_sdk = async (): Promise<SDK<PistolsSchemaType>> => {
  const sdk: SDK<PistolsSchemaType> = await init({
    client: {
      toriiUrl: dojoConfig.toriiUrl,
      worldAddress: dojoConfig.manifest.world.address,
    },
    domain: {
      ...starknetDomain,
      name: 'pistols_gg_quests',
    },
    // identity: env.ACCOUNT_ADDRESS,
    // signer: SigningKey.fromSecretScalar(env.ACCOUNT_PRIVATE_KEY),
  });
  return sdk;
};

export {
  init_sdk,
  dojoConfig,
  networkConfig,
  networkId,
}
