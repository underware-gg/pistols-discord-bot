import type { InteractionReplyOptions } from 'discord.js';
import { BigNumberish } from 'starknet';
import { getChallengesByDuelist, ChallengeResponse } from '../queries/getChallenges.js';
import { ChallengeState, toChallengeState } from '../utils/constants.js';
import { formatChallengesPayload } from '../formatters/challenges.js';
import { bigintToHex } from '../utils/misc.js';

//------------------------------
// duelist_duels
//
export const duelist_duels = () => {
  const customId = 'duelist_duels';
  const builder = (address: BigNumberish, state: ChallengeState) => {
    return `${customId};${bigintToHex(address)};${state}`;
  }
  const run = async (options: string[]): Promise<InteractionReplyOptions> => {
    const [customId, address, state] = options;
    const challenges: ChallengeResponse[] = await getChallengesByDuelist([toChallengeState(state)], address);
    return await formatChallengesPayload({ challenges });
  }
  return {
    customId,
    ephemeral: true,
    builder,
    run,
  }
}

//------------------------------
// duelist_duels
//
export const past_duels = () => {
  const customId = 'past_duels';
  const builder = (address: BigNumberish) => {
    return `${customId};${bigintToHex(address)}`;
  }
  const run = async (options: string[]): Promise<InteractionReplyOptions> => {
    const [customId, address] = options;
    const challenges: ChallengeResponse[] = await getChallengesByDuelist([ChallengeState.Refused, ChallengeState.Draw], address);
    return await formatChallengesPayload({ challenges });
  }
  return {
    customId,
    ephemeral: true,
    builder,
    run,
  }
}

