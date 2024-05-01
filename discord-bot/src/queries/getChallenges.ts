import { sdk } from "../config.js";
import { feltToString } from "../utils/misc.js";
import * as ql from "../generated/graphql.js";

export const getChallengesByState = async (state: number): Promise<ql.Challenge[]> => {
  try {
    const { data } = await sdk.getChallengesByState({ state });
    return parseChallengesResponse(data)
  } catch (error) {
    console.error("getChallengesByState() fetching error:", error);
    throw error;
  }
};

export const getChallengesById = async (duel_id: any): Promise<ql.Challenge[]> => {
  try {
    const { data } = await sdk.getChallengesById({ duel_id });
    return parseChallengesResponse(data)
  } catch (error) {
    console.error("getChallengesById() fetching error:", error);
    throw error;
  }
};

export const getDuelistByAddress = async (address: any): Promise<ql.Duelist | null> => {
  try {
    const { data } = await sdk.getDuelistsByAddress({ address });
    return parseDuelistResponse(data)
  } catch (error) {
    console.error("getDuelistByAddress() failed!", error);
    throw error;
  }
}


const parseChallengesResponse = (data: ql.GetChallengesByStateQuery | ql.GetChallengesByIdQuery | null | undefined): ql.Challenge[] => {
  let result: ql.Challenge[] = data?.challengeModels?.edges?.map((item: any) => {
    const challenge = item.node;
    return {
      ...challenge,
      message: feltToString(challenge.message), // strings in Cairo are encoded in a felt252, need to be convert
    }
  }) ?? [];
  return result
};

const parseDuelistResponse = (
  data: ql.GetDuelistsByAddressQuery
): ql.Duelist | null => {
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