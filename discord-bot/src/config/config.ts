import { GraphQLClient } from "graphql-request";
import { SdkWs, getSdkWs } from "./SdkWs.js";
import { dojoConfig } from "./dojoConfig.js";
import * as ql from "../generated/graphql.js";

const url_http = dojoConfig().toriiUrl + "/graphql";
const url_ws = url_http.replace("https://", 'wss://').replace("http://", 'ws://') + "/ws";

console.log(`--- GraphQL HTTP :`, url_http)
console.log(`--- GraphQL WS   :`, url_ws)

export const sdk: ql.Sdk = ql.getSdk(
  new GraphQLClient(dojoConfig().toriiUrl + "/graphql")
);

export const sdk_ws: SdkWs = getSdkWs(url_ws);
