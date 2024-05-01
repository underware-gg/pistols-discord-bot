import { GraphQLClient } from "graphql-request";
import { Sdk, getSdk } from "./generated/graphql.js";
import { SdkWs, getSdkWs } from "./SdkWs.js";
import { dojoConfig } from "./dojoConfig.js";

const url_http = dojoConfig().toriiUrl + "/graphql";
const url_ws = url_http.replace("https://", 'wss://').replace("http://", 'ws://') + "/ws";

console.log(`--- GraphQL HTTP :`, url_http)
console.log(`--- GraphQL WS   :`, url_ws)

export const sdk: Sdk = getSdk(
  new GraphQLClient(dojoConfig().toriiUrl + "/graphql")
);

export const sdk_ws: SdkWs = getSdkWs(url_ws);
