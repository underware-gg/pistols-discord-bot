import { EmbedBuilder } from "discord.js";
import { Challenge } from "../generated/graphql";
import { tagDuelist } from "./social_app.js";
import { ChallengeState, ChallengeStateDescriptions, ChallengeStateNames, Colors } from "./constants.js";
import { shortAddress } from "./misc.js";
import { makeSquareProfilePicUrl } from "./duelists.js";
//
// Format Challenges as text message
// 
// example usage:
// return interaction.editReply({
//     content: formatChallengesAsText(challenges),
// });
//

export const formatChallengesAsText = (challenges: Challenge[]): string => {
  return challenges.reduce((result: string, challenge: any, index: number) => {
    return result + `Duel \`${index + 1}\` ID: \`${challenge.duel_id}\` - Challenger: ${challenge.duelist_a} , Challenged: ${challenge.duelist_b}\n`;
  }, '');
}


//
// Format Challenges as embeds
//
// example usage:
// return interaction.editReply({
//     embeds: formatChallengesAsEmbeds(challenges),
// });
//
// reference:
// https://discordjs.guide/popular-topics/embeds.html
//

export const formatChallengesAsEmbeds = async ({
  challenges,
  title = 'Challenges',
}: {
  challenges: Challenge[],
  title?: string
}): Promise<EmbedBuilder[]> => {
  return await Promise.all(challenges.map(async (challenge, index) => {
    const state = challenge.state as ChallengeState;
    const challengerHonour = challenge.duelist_a.honour;
    const challengedHonour = challenge.duelist_b.honour;
    const winner = (challenge.winner == 1 ? challenge.duelist_a : challenge.winner == 2 ? challenge.duelist_b : null)
    // const duel_time = new Date(challenge.timestamp_start * 1000);

    const title = `#${index + 1}: ` + (
      winner ? `${winner.name} won!`
        : ChallengeStateDescriptions[state]
    )

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
      // .setDescription(`**Duel ID:** \`${shortAddress(challenge.duel_id)}\``)
      .setDescription(`Duel id: \`${challenge.duel_id}\``)
      .setThumbnail(makeSquareProfilePicUrl(winner?.profile_pic ?? 0))
      .addFields(
        { name: 'Challenger', value: challenger.join('\n'), inline: true },
        { name: 'Challenged', value: challenged.join('\n'), inline: true },
        // { name: 'Status', value: `${ChallengeStateNames[challenge.state as ChallengeState]}`, inline: true },
        // { name: 'Current Round', value: `${challenge.round_number}`, inline: true },
        // { name: 'Duel Time', value: `${duel_time.toLocaleString()}` },
      );
    return embed;
  }));
}


export const formatDuelsAsEmbeds = ({
  challenges,
  title = 'Duel',
}: {
  challenges: Challenge[],
  title?: string
}): EmbedBuilder[] => {
  return challenges.map((challenge, index) => {
    const challengerName = challenge.duelist_a.name;
    const challengedName = challenge.duelist_b.name;
    const challengerHonour = challenge.duelist_a.honour;
    const challengedHonour = challenge.duelist_b.honour;
    const duel_time = new Date(challenge.timestamp_start * 1000);
    const url = `${process.env.CLIENT_URL}/profiles/0${challenge.duelist_a.profile_pic}_sq.jpg`
    const url1 = `${process.env.CLIENT_URL}/profiles/0${challenge.duelist_b.profile_pic}_sq.jpg`

    const embed = new EmbedBuilder()
      .setColor(Colors.Positive)
      .setTitle(`${title}`)
      .setThumbnail(url)
      .setDescription(`**Duel ID:** \`${shortAddress(challenge.duel_id)}\``)
      .addFields(
        { name: 'Challenger', value: `${challengerName}\nHonour: ${challengerHonour / 10}  ${challengerHonour > 90 ? " 👑" : ""}`, inline: true },
        { name: 'Challenged', value: `${challengedName}\nHonour: ${challengedHonour / 10} ${challengedHonour > 90 ? " 👑" : ""}`, inline: true },
        { name: 'Round', value: `${challenge.round_number}` },
        { name: 'Challenge', value: `${challenge.message}`, inline: true },
        { name: 'Duel Time', value: `${duel_time.toLocaleString()}`, inline: true },
        { name: 'For more?', value: 'use the /duelist command', inline: true },
      )
      .setImage(url1)

    return embed;
  });
}



