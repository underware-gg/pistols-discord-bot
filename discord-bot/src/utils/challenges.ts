import { EmbedBuilder } from "discord.js";
import { tagDuelist } from "./social_app.js";
import { toChallengeState, ChallengeStateDescriptions, Colors } from "./constants.js";
import { ChallengeResponse } from "../queries/getChallenges.js";
import { makeSquareProfilePicUrl } from "./duelists.js";
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
// return interaction.editReply({
//     embeds: await formatChallengesAsEmbeds(challenges),
// });
//
// reference:
// https://discordjs.guide/popular-topics/embeds.html
//

export const formatChallengesAsEmbeds = async ({
  challenges,
}: {
  challenges: ChallengeResponse[],
}): Promise<EmbedBuilder[]> => {
  return await Promise.all(challenges.map(async (challenge, index) => {
    const state = toChallengeState(challenge.state);
    const challengerHonour = challenge.duelist_a.honour;
    const challengedHonour = challenge.duelist_b.honour;
    const winner = (challenge.winner == 1 ? challenge.duelist_a : challenge.winner == 2 ? challenge.duelist_b : null)
    // const duel_time = new Date(challenge.timestamp_start * 1000);

    const title = `#${index + 1}: ` + (
      winner ? `${winner.name} won!`
        : ChallengeStateDescriptions[state]
    )

    const descriptions = [
      // `*${challenge.message}*`,
      `Duel id: \`${challenge.duel_id}\``,
    ]

    const { tag: tag_a } = await tagDuelist(challenge.duelist_a.address)
    const { tag: tag_b } = await tagDuelist(challenge.duelist_b.address)

    const challenger = [
      challenge.duelist_a.name,
      `Honour: ${challengerHonour / 10}  ${challengerHonour > 90 ? " 👑" : ""}`
    ]
    const challenged = [
      challenge.duelist_b.name,
      `Honour: ${challengedHonour / 10} ${challengedHonour > 90 ? " 👑" : ""}`
    ]
    if (tag_a) challenger.push(tag_a)
    if (tag_b) challenged.push(tag_b)

    const embed = new EmbedBuilder()
      .setColor(Colors.Positive)
      .setTitle(title)
      .setAuthor({
        name: challenge.message,
        iconURL: makeSquareProfilePicUrl(challenge.duelist_a.profile_pic),
        //  url: 'https://discord.js.org',
      })
      .setDescription(descriptions.join('\n'))
      .setThumbnail(makeSquareProfilePicUrl(winner?.profile_pic ?? 0))
      .addFields(
        { name: 'Challenger', value: challenger.join('\n'), inline: true },
        { name: 'Challenged', value: challenged.join('\n'), inline: true },
        { name: 'Wager', value: challenge.wager.value_eth ? `💰 ${challenge.wager.value_eth}` : `-`, inline: true },
        // { name: 'Status', value: `${ChallengeStateNames[toChallengeState(challenge.state)]}`, inline: true },
        // { name: 'Current Round', value: `${challenge.round_number}`, inline: true },
        // { name: 'Duel Time', value: `${duel_time.toLocaleString()}` },
      );
    return embed;
  }));
}

