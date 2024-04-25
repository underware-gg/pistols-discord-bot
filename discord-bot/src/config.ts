import { GraphQLClient } from "graphql-request";
import { Sdk, getSdk } from "./generated/graphql.js";
import { dojoConfig } from "./dojoConfig.js";

export const sdk: Sdk = getSdk(
  new GraphQLClient(dojoConfig().toriiUrl + "/graphql")
);

export const POLL_INTERVAL = 3000;
