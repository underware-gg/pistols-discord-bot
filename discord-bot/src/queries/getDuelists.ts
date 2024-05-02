import * as ql from "../generated/graphql.js";
import { sdk } from "../config.js";
import { bigintToHex, feltToString } from "../utils/misc.js";
import { BigNumberish } from "starknet";

export const getDuelistByAddress = async (address: BigNumberish): Promise<DuelistResponse | null> => {
  try {
    const { data } = await sdk.getDuelistsByAddress({
      address: bigintToHex(address),
    });
    return parseDuelistResponse(data?.duelistModels as ql.DuelistConnection)
  } catch (error) {
    console.error("getDuelistByAddress() failed!", error);
    throw error;
  }
}

//--------------------------------------
// Duelist
//

export type DuelistResponse = ql.Duelist & {
  name: string
}

export const parseDuelistResponse = (connection: ql.DuelistConnection): DuelistResponse | null => {
  const duelist = connection?.edges?.[0]?.node;
  if (!duelist) return null;
  return {
    ...duelist,
    name: feltToString(duelist.name),
  }
}
