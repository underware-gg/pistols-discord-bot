import { sdk } from "../config/config.js";
import { BigNumberish } from "starknet";
import { DuelistResponse, parseDuelistResponse } from "./getDuelists.js";
import { ChallengeState, toChallengeState } from "../utils/constants.js";
import {  feltToString, weiToEth } from "../utils/misc.js";
import * as ql from "../generated/graphql.js";

const PAGE_SIZE = 10;

export const getChallengesById = async (duel_id: string): Promise<ChallengeResponse[]> => {
  try {
    const { data } = await sdk.getChallengesById({ duel_id });
    return await parseChallengesResponse(Object.values(data) as ql.ChallengeConnection[])
  } catch (error) {
    console.error("getChallengesById() fetching error:", error);
    return [];
  }
}

export const getChallengesByState = async (states: ChallengeState[]): Promise<ChallengeResponse[]> => {
  try {
    const { data } = states.length == 1
      ? await sdk.getChallengesByState({ state: states[0] })
      : await sdk.getChallengesByStates({ state1: states[0], state2: states[1] });
    return await parseChallengesResponse(Object.values(data) as ql.ChallengeConnection[])
  } catch (error) {
    console.error("getChallengesByState() fetching error:", error);
    return [];
  }
}

export const getChallengesByDuelist = async (states: ChallengeState[], address: BigNumberish): Promise<ChallengeResponse[]> => {
  try {
    const { data } = states.length == 1
      ? await sdk.getChallengesByDuelistAndState({ address, state: states[0] })
      : await sdk.getChallengesByDuelistAndStates({ address, state1: states[0], state2: states[1] });
    return await parseChallengesResponse(Object.values(data) as ql.ChallengeConnection[])
  } catch (error) {
    console.error("getChallengesByState() fetching error:", error);
    return [];
  }
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

const parseChallengesResponse = async (connections: ql.ChallengeConnection[], count: number = PAGE_SIZE): Promise<ChallengeResponse[]> => {
  //
  // combine all connections edges
  let edges = connections.reduce((acc, conn) => {
    return [
      ...acc,
      ...(conn?.edges ?? []),
     ] as ql.ChallengeEdge[];
  }, [] as ql.ChallengeEdge[] );
  if (edges.length == 0) return []
  //
  // sort
  edges.sort((a, b) => (b.node?.timestamp_start - a.node?.timestamp_start));
  edges.sort((a, b) => (b.node?.timestamp_end - a.node?.timestamp_end));
  //
  // slice
  edges = edges.slice(0, count);
  //
  // parse
  let result: ChallengeResponse[] = await Promise.all(edges.map(async (item: any) => {
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
