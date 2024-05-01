import { sdk } from "../config.js";
import { BigNumberish } from "starknet";
import { getDuelistByAddress } from "./getDuelists.js";
import { ChallengeState, toChallengeState } from "../utils/constants.js";
import { bigintEquals, feltToString } from "../utils/misc.js";
import * as ql from "../generated/graphql.js";

export const getChallengesByState = async (state: ChallengeState): Promise<ql.Challenge[]> => {
  try {
    const { data } = await sdk.getChallengesByState({ state });
    return await parseChallengesResponse(data)
  } catch (error) {
    console.error("getChallengesByState() fetching error:", error);
    return [];
  }
}

export const getChallengesById = async (duel_id: any): Promise<ql.Challenge[]> => {
  try {
    const { data } = await sdk.getChallengesById({ duel_id });
    return await parseChallengesResponse(data)
  } catch (error) {
    console.error("getChallengesById() fetching error:", error);
    return [];
  }
}

export const getChallengesByDuelist = async (state: ChallengeState, address: BigNumberish): Promise<ql.Challenge[]> => {
  const allChallenges: ql.Challenge[] = await getChallengesByState(state);
  const challenges = allChallenges.filter(challenge => (
    bigintEquals(challenge.duelist_a.address, address) ||
    bigintEquals(challenge.duelist_b.address, address)
  ));
  return challenges;
}

const parseChallengesResponse = async (data: ql.GetChallengesByStateQuery | ql.GetChallengesByIdQuery | null | undefined): Promise<ql.Challenge[]> => {
  if (!data?.challengeModels?.edges) return []
  let result: ql.Challenge[] = await Promise.all(data.challengeModels.edges.map(async (item: any) => {
    const challenge = item.node;
    const duelist_a = await getDuelistByAddress(challenge.duelist_a);
    const duelist_b = await getDuelistByAddress(challenge.duelist_b);
    return {
      ...challenge,
      state: toChallengeState(challenge.state),
      message: feltToString(challenge.message), // strings in Cairo are encoded in a felt252, need to be convert
      duelist_a,
      duelist_b,
    }
  }));
  return result
}
