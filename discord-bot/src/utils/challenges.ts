import { APIEmbed, EmbedBuilder } from "discord.js";
import { Challenge } from "../generated/graphql";
import { Colors } from "./constants.js";
import { feltToString } from "../utils/misc.js";
import { url } from "inspector";
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

export const formatChallengesAsEmbeds = ({
  challenges,
  title = 'Challenges',
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

    const embed = new EmbedBuilder()
      .setColor(Colors.Positive)
      .setTitle(`${title} #${index + 1}`)
      .setDescription(`**Duel ID:** \`${challenge.duel_id.substring(0, 6)}\`.....`)
      .addFields(
        { name: 'Challenger', value: `${challengerName}\nHonour: ${challengerHonour / 10}  ${challengerHonour > 90 ? " 👑" : ""}`, inline: true },
        { name: 'Challenged', value: `${challengedName}\nHonour: ${challengedHonour / 10} ${challengedHonour > 90 ? " 👑" : ""}`, inline: true },
        { name: 'Round Number', value: `${challenge.round_number}` },
        { name: 'Duel Time', value: `${duel_time.toLocaleString()}` },
      );
    return embed;
  });
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
      .setDescription(`**Duel ID:** \`${challenge.duel_id.substring(0, 6)}\`.....`)
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



