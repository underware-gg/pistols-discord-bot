import { sdk } from "../config.js";
import { feltToString } from "../utils/misc.js";
import * as ql from "../generated/graphql.js";
import { ChallengeState } from "../utils/constants.js";

export const getChallengesByState = async (state: number): Promise<ql.Challenge[]> => {
  try {
    const { data } = await sdk.getChallengesByState({ state });
    return parseChallengesResponse(data)
  } catch (error) {
    console.error("getChallengesByState() fetching error:", error);
    return [];
  }
}

export const getChallengesById = async (duel_id: any): Promise<ql.Challenge[]> => {
  try {
    const { data } = await sdk.getChallengesById({ duel_id });
    return parseChallengesResponse(data)
  } catch (error) {
    console.error("getChallengesById() fetching error:", error);
    return [];
  }
}


const parseChallengesResponse = (data: ql.GetChallengesByStateQuery | ql.GetChallengesByIdQuery | null | undefined): ql.Challenge[] => {
  let result: ql.Challenge[] = data?.challengeModels?.edges?.map((item: any) => {
    const challenge = item.node;
    return {
      ...challenge,
      state: challenge.state as ChallengeState,
      message: feltToString(challenge.message), // strings in Cairo are encoded in a felt252, need to be convert
    }
  }) ?? [];
  return result
}

