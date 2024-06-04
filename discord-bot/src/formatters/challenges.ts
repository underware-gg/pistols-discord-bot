import { BaseMessageOptions, EmbedBuilder } from "discord.js";
import { tagDuelist } from "../utils/db_accounts.js";
import { toChallengeState, ChallengeStateDescriptions, Colors, ChallengeState } from "../utils/constants.js";
import { makeDuelUrl, makeLogoUrl, makeSquareProfilePicUrl } from "../utils/pistols.js";
import { ChallengeResponse } from "../queries/getChallenges.js";
import { formatNoDuelsFound } from "./messages.js";
import { bigintEquals, formatTimestamp } from "../utils/misc.js";
import { BigNumberish } from "starknet";

//
// Format Challenges as text message
// 
// example usage:
// return interaction.editReply({
//     content: formatChallengesAsText(challenges),
// });
//

export const formatChallengesAsText = (challenges: ChallengeResponse[]): string => {
  return challenges.reduce((result: string, challenge: any, index: number) => {
    return result + `Duel \`${index + 1}\` ID: \`${challenge.duel_id}\` - Challenger: ${challenge.duelist_a} , Challenged: ${challenge.duelist_b}\n`;
  }, '');
}


//
// Format Challenges as embeds
//
// example usage:
// return interaction.editReply(await formatChallengesPayload());
//
// reference:
// https://discordjs.guide/popular-topics/embeds.html
//

export const formatChallengesPayload = async ({
  title,
  challenges,
}: {
  title?: string,
  challenges: ChallengeResponse[],
}): Promise<BaseMessageOptions> => {
  if (!challenges || challenges.length == 0) {
    return formatNoDuelsFound();
  }
  const embeds = await Promise.all(challenges.map(async (challenge, index) => {
    const state = toChallengeState(challenge.state);
    const honour_a = challenge.duelist_a.score.honour;
    const honour_b = challenge.duelist_b.score.honour;
    const winner = (challenge.winner == 1 ? challenge.duelist_a : challenge.winner == 2 ? challenge.duelist_b : null)
    const wager = challenge.wager.value_eth;
    // const duel_time = new Date(challenge.timestamp_start * 1000);

    const _title = title ?? (` ` + (winner ? `${winner.name} won!` : ChallengeStateDescriptions[state]));

    const thumbnail = state == ChallengeState.Resolved ? makeSquareProfilePicUrl(winner?.profile_pic ?? 0)
      : [ChallengeState.Awaiting, ChallengeState.InProgress].includes(state) ? makeSquareProfilePicUrl(0)
        : makeLogoUrl();

    let descriptions: string[] = []
    if (wager > 0) {
      if ([ChallengeState.Awaiting, ChallengeState.InProgress, ChallengeState.Resolved].includes(state)) {
        descriptions.push(`💰 ${wager}`);
      } else {
        descriptions.push(`💰 ~~${wager}~~`);
      }
    }
    if ([ChallengeState.InProgress, ChallengeState.Resolved, ChallengeState.Draw].includes(state)) {
      descriptions.push(`🍿 [Replay Duel](${makeDuelUrl(challenge.duel_id)})`);
    }
    descriptions.push(`\`${challenge.duel_id}\``);

    const footerText = `#${index + 1} / ${formatTimestamp(challenge.timestamp_end ? challenge.timestamp_end : challenge.timestamp_start)}`;

    const color = state == ChallengeState.Awaiting ? Colors.Bright
      : state == ChallengeState.InProgress ? Colors.Warning
        : state == ChallengeState.Resolved ? Colors.Positive
          : state == ChallengeState.Draw ? Colors.Negative
            : Colors.Dark

    const { tag: tag_a } = await tagDuelist(challenge.duelist_a.address)
    const { tag: tag_b } = await tagDuelist(challenge.duelist_b.address)

    // Duelists
    const name_a = challenge.duelist_a.name;// + ' 🆚';
    const name_b = challenge.duelist_b.name;
    const desc_a = [
      // challenge.duelist_a.name,
      `Honour: ${honour_a / 10}  ${honour_a > 90 ? " 👑" : ""}`
    ]
    const desc_b = [
      // challenge.duelist_b.name,
      `Honour: ${honour_b / 10} ${honour_b > 90 ? " 👑" : ""}`
    ]
    if (tag_a) desc_a.push(tag_a)
    if (tag_b) desc_b.push(tag_b)
    // if (wager > 0 && challenge.winner == 1) desc_a.push(`💰 ${wager}`);
    // if (wager > 0 && challenge.winner == 2) desc_b.push(`💰 ${wager}`);

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(_title)
      .setAuthor({
        name: challenge.message,
        iconURL: makeSquareProfilePicUrl(challenge.duelist_a.profile_pic),
        //  url: 'https://discord.js.org',
      })
      .setDescription(descriptions.join('\n'))
      .setThumbnail(thumbnail)
      .setFooter({ text: footerText, iconURL: undefined })
      .addFields(
        { name: name_a, value: desc_a.join('\n'), inline: true },
        { name: ' ', value: '⚔️', inline: true },
        { name: name_b, value: desc_b.join('\n'), inline: true },
        // { name: 'Wager', value: challenge.wager.value_eth ? `💰 ${challenge.wager.value_eth}` : `-`, inline: true },
        // { name: 'Status', value: `${ChallengeStateNames[toChallengeState(challenge.state)]}`, inline: true },
        // { name: 'Current Round', value: `${challenge.round_number}`, inline: true },
      );
    return embed;
  }));
  return {
    embeds
  }
}


export const formatDuelistsTurnPayload = async (address: BigNumberish, challenge: ChallengeResponse): Promise<BaseMessageOptions | null> => {
  const { tag } = await tagDuelist(address)
  if (!tag) {
    return null;
  }

  const opponentName = bigintEquals(address, challenge.duelist_a.address) ? challenge.duelist_b.name : challenge.duelist_a.name

  let descriptions: string[] = []
  descriptions.push(`Hey ${tag}, it's your turn against **${opponentName}**!`);
  descriptions.push(`⚔️ [Act now!](<${makeDuelUrl(challenge.duel_id)}>)`);

  return {
    content: descriptions.join('\n'),
  }
}
