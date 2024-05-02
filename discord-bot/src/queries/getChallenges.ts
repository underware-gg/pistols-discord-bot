import { sdk } from "../config.js";
import { BigNumberish } from "starknet";
import { DuelistResponse, parseDuelistResponse } from "./getDuelists.js";
import { ChallengeState, toChallengeState } from "../utils/constants.js";
import { bigintEquals, feltToString, weiToEth } from "../utils/misc.js";
import * as ql from "../generated/graphql.js";

export const getChallengesByState = async (state: ChallengeState): Promise<ChallengeResponse[]> => {
  try {
    const { data } = await sdk.getChallengesByState({ state });
    return await parseChallengesResponse(data?.challenges as ql.ChallengeConnection)
  } catch (error) {
    console.error("getChallengesByState() fetching error:", error);
    return [];
  }
}

export const getChallengesById = async (duel_id: any): Promise<ChallengeResponse[]> => {
  try {
    const { data } = await sdk.getChallengesById({ duel_id });
    return await parseChallengesResponse(data?.challenges as ql.ChallengeConnection)
  } catch (error) {
    console.error("getChallengesById() fetching error:", error);
    return [];
  }
}

export const getChallengesByDuelist = async (state: ChallengeState, address: BigNumberish): Promise<ChallengeResponse[]> => {
  const allChallenges: ChallengeResponse[] = await getChallengesByState(state);
  const challenges = allChallenges.filter(challenge => (
    bigintEquals(challenge.duelist_a.address, address) ||
    bigintEquals(challenge.duelist_b.address, address)
  ));
  return challenges;
}


//--------------------------------------
// Challenge + Duelists + Wager
//

export type ChallengeResponse = ql.Challenge & {
  state: ChallengeState
  message: string
  duelist_a: DuelistResponse
  duelist_b: DuelistResponse
  wager: WagerResponse
}

const parseChallengesResponse = async (connection: ql.ChallengeConnection): Promise<ChallengeResponse[]> => {
  if (!connection?.edges) return []
  let result: ChallengeResponse[] = await Promise.all(connection.edges.map(async (item: any) => {
    const challenge = item.node;

    const { data } = await sdk.getChallengeDependencies({
      duel_id: challenge.duel_id,
      duelist_a: challenge.duelist_a,
      duelist_b: challenge.duelist_b,
    });

    const duelist_a = parseDuelistResponse(data.duelist_a as ql.DuelistConnection);
    const duelist_b = parseDuelistResponse(data.duelist_b as ql.DuelistConnection);
    const wager = parseWagerResponse(data.wager as ql.WagerConnection);

    return {
      ...challenge,
      state: toChallengeState(challenge.state),
      message: feltToString(challenge.message), // strings in Cairo are encoded in a felt252, need to be convert
      duelist_a,
      duelist_b,
      wager,
    }
  }));
  return result
}


//--------------------------------------
// Wager
//

export type WagerResponse = ql.Wager & {
  value_eth: number
  fee_eth: number
}

const parseWagerResponse = (connection: ql.WagerConnection): WagerResponse | null => {
  const wager = connection?.edges?.[0]?.node;
  if (!wager) return null;
  return {
    ...wager,
    value_eth: Number(weiToEth(wager.value)),
    fee_eth: Number(weiToEth(wager.fee)),
  }
}
