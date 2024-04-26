import { APIEmbed, EmbedBuilder } from "discord.js";
import { Challenge } from "../generated/graphql";
import { Colors } from "./constants.js";

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
        return result + `duel \`${index + 1}\` id: \`${challenge.duel_id}\`\n`;
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
    const description = formatChallengesAsText(challenges);
    const result = new EmbedBuilder()
        .setColor(Colors.Positive)
        .setTitle(title)
        .setDescription(description ?? null)
        // .setURL('https://discord.js.org/')
        // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        // .addFields(
        //     { name: 'Regular field title', value: 'Some value here' },
        //     { name: '\u200B', value: '\u200B' },
        //     { name: 'Inline field title', value: 'Some value here', inline: true },
        //     { name: 'Inline field title', value: 'Some value here', inline: true },
        // )
        // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        // .setImage('https://i.imgur.com/AfFp7pu.png')
        // .setTimestamp()
        // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return [result]
}

