// import { createDojoConfig } from '@dojoengine/core';
// import { NetworkId, NETWORKS, getManifest, makeStarknetDomain } from '@underware/pistols-sdk/pistols/config';
// // import { getContractByName } from '@dojoengine/core';
// // import { bigintToHex } from '@underware/pistols-sdk/utils';
// // import { stringToFelt } from '@underware/pistols-sdk/starknet';
// // import { constants } from '@underware/pistols-sdk/pistols/gen';

// const networkId = process.env.NETWORK_ID as NetworkId ?? NetworkId.MAINNET;
// // const networkId = NetworkId.ACADEMY;
// const networkConfig = NETWORKS[networkId];
// const starknerDomain = makeStarknetDomain({ networkId });

// // const game_contract = getContractByName(dojoAppConfig.manifest, dojoAppConfig.namespace, 'game');
// // const duel_contract = getContractByName(dojoAppConfig.manifest, dojoAppConfig.namespace, 'duel_token');
// // const duelist_contract = getContractByName(dojoAppConfig.manifest, dojoAppConfig.namespace, 'duelist_token');

// const dojoConfig = createDojoConfig({
//   manifest: getManifest({ networkId }),
//   toriiUrl: networkConfig.toriiUrl,
//   relayUrl: networkConfig.relayUrl,
// });

// export {
//   networkId,
//   networkConfig,
//   starknerDomain,
//   dojoConfig,
// }