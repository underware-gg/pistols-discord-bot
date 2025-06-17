import type { BigNumberish, StarknetDomain } from 'starknet';
import { container, LogLevel, SapphireClient } from '@sapphire/framework';
import { bigintEquals, bigintToAddress, queryToriiSql } from '@underware/pistols-sdk/utils';
import { models } from '@underware/pistols-sdk/pistols/gen';
import { constants } from '@underware/pistols-sdk/pistols/gen';
import { parseEnumVariant } from '@underware/pistols-sdk/starknet';



type ChallengeOpponentResponseRaw = Array<{
  duel_id: string;
  state: constants.ChallengeState;
  address_a: string;
  address_b: string;
  duelist_id_a: string;
  duelist_id_b: string;
  username_a: string;
  username_b: string;
}>;
// format we need
type ChallengeOpponentResponse = {
  duelId: bigint;
  state: constants.ChallengeState;
  addressA: bigint;
  addressB: bigint;
  duelistIdA: bigint;
  duelistIdB: bigint;
  usernameA: string;
  usernameB: string;
};
function formatFn(rows: ChallengeOpponentResponseRaw): ChallengeOpponentResponse | null {
  return rows.length > 0 ? {
    duelId: BigInt(rows[0].duel_id),
    state: parseEnumVariant<constants.ChallengeState>(rows[0].state) as constants.ChallengeState,
    addressA: BigInt(rows[0].address_a),
    addressB: BigInt(rows[0].address_b),
    duelistIdA: BigInt(rows[0].duelist_id_a),
    duelistIdB: BigInt(rows[0].duelist_id_b),
    usernameA: rows[0].username_a,
    usernameB: rows[0].username_b,
  } : null;
}

export const getChallengeOpponent = async (duelId: BigNumberish): Promise<ChallengeOpponentResponse | null> => {
  const query = `
select
duel_id,
state,
address_a,
address_b,
duelist_id_a,
duelist_id_b,
(select username from controllers where INSTR(address_a, SUBSTRING(address, 3, 64)) > 0) as username_a,
(select username from controllers where INSTR(address_b, SUBSTRING(address, 3, 64)) > 0) as username_b
from "pistols-Challenge"
where duel_id = "${bigintToAddress(duelId)}"
`;
  // console.log(`getChallengeOpponent(${duelId}):`, query);
  const response = await queryToriiSql(container.networkConfig.sqlUrl, query, formatFn);
  // console.log(`getChallengeOpponent(${duelId}):`, response);
  return response;
};


export type Opponent = {
  controllerName?: string;
  discordName?: string;
  avatar?: string;
  formattedName: string;
  challenge_state?: string;
}

export const get_opponent = async (playerAddress: BigNumberish, duelId: BigNumberish): Promise<Opponent> => {
  // find challenge
  const challenge = await getChallengeOpponent(duelId);
  // find opponent
  const youAreA = bigintEquals(playerAddress, challenge?.addressA ?? 0);
  const opponentAddress = youAreA ? bigintToAddress(challenge?.addressB ?? 0) : bigintToAddress(challenge?.addressA ?? 0);
  const opponentUsername = youAreA ? challenge?.usernameB : challenge?.usernameA;

  // get opponent social link
  const opponentSocialLink: models.PlayerSocialLinkEvent | undefined = container.pistols_players[opponentAddress]
  const controllerName: string | undefined = opponentUsername;
  let discordName: string | undefined;
  let avatar: string | undefined;
  let formattedName: string;
  if (opponentSocialLink) {
    discordName = opponentSocialLink?.user_name;
    avatar = opponentSocialLink ? `https://cdn.discordapp.com/avatars/${opponentSocialLink.user_id}/${opponentSocialLink.avatar}.png` : undefined;
    formattedName = `<@${opponentSocialLink.user_id}>`;
    if (controllerName) {
      formattedName += `(\`${controllerName}\`)`;
    }
  } else if (controllerName) {
    formattedName = `\`${controllerName}\``;
  } else {
    formattedName = 'an Unknown player';
  }
  const opponent: Opponent = {
    controllerName,
    discordName,
    avatar,
    formattedName,
    challenge_state: challenge?.state,
  };
  return opponent;
}
