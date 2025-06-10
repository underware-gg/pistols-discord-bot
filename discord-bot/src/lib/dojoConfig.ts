import type { StarknetDomain } from 'starknet';
import { createDojoConfig } from '@dojoengine/core';
import { NetworkId, NETWORKS, getManifest, makeStarknetDomain } from '@underware/pistols-sdk/pistols/config';
import type { DojoNetworkConfig } from '@underware/pistols-sdk/pistols/config';
import type { PistolsSchemaType } from '@underware/pistols-sdk/pistols/node';
import { type SDK, init } from '@dojoengine/sdk/node';
import websocket from 'websocket';

// required for torii client websockets
// globalThis.global = globalThis;
// @ts-ignore
global.Websocket = websocket.w3cwebsocket;
// @ts-ignore
global.WorkerGlobalScope = global;


const networkId = process.env.NETWORK_ID as NetworkId ?? NetworkId.MAINNET;
const networkConfig: DojoNetworkConfig = NETWORKS[networkId];
const starknetDomain: StarknetDomain = makeStarknetDomain({ networkId });

// const game_contract = getContractByName(dojoAppConfig.manifest, dojoAppConfig.namespace, 'game');
// const duel_contract = getContractByName(dojoAppConfig.manifest, dojoAppConfig.namespace, 'duel_token');
// const duelist_contract = getContractByName(dojoAppConfig.manifest, dojoAppConfig.namespace, 'duelist_token');

const dojoConfig = createDojoConfig({
  manifest: getManifest({ networkId }),
  toriiUrl: networkConfig.toriiUrl,
  relayUrl: networkConfig.relayUrl,
});

const init_sdk = async (): Promise<SDK<PistolsSchemaType>> => {
  const sdk: SDK<PistolsSchemaType> = await init({
    client: {
      toriiUrl: dojoConfig.toriiUrl,
      relayUrl: dojoConfig.relayUrl,
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
}
