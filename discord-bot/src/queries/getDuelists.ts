import * as gql from "../generated/graphql.js";
import { sdk } from "../config.js";
import { feltToString } from "../utils/misc.js";

export const getDuelist = async (address: any): Promise<gql.Duelist | null> => {
  try {
    const { data } = await sdk.getDuelistsByAddress({ address });
    return parseDuelistResponse(data);
  } catch (error) {
    console.error("getDuelistByAddress() fetching error:", error);
    throw error;
  }
};

const parseDuelistResponse = (
  data: gql.GetDuelistsByAddressQuery
): gql.Duelist | null => {
  if (
    data?.duelistModels?.edges?.length &&
    data.duelistModels.edges.length > 0
  ) {
    const duelist = data.duelistModels.edges[0]?.node;
    if (duelist) {
      return {
        ...duelist,
      };
    }
  }
  return null;
};
