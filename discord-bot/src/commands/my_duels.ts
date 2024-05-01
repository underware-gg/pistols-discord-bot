import { Command } from "@sapphire/framework";
import { getChallengesByState } from "../queries/getChallenges.js";
import { getDuelistByAddress } from '../queries/getDuelists.js';
import { formatChallengesAsEmbeds } from "../utils/challenges.js";
import { ChallengeState } from "../utils/constants.js";
import { Challenge } from "../generated/graphql.js";
import axios from 'axios';

export class MyDuelsCommand extends Command {
  public constructor(context: Command.LoaderContext, options?: Command.Options) {
    super(context, {
      ...options,
      description: "List My Duels",
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption(option =>
          option.setName('duel-state')
            .setDescription('the duel state, completed or not')
            .setRequired(true)
            .addChoices(
              { name: 'Ongoing', value: '5' },
              { name: 'Resolved', value: '6' },
              { name: 'Awaiting', value: '1' },
              { name: 'Withdrawn', value: '2' },
              { name: 'Expired', value: '4' },
              { name: 'Refused', value: '3' },
              { name: 'Draw', value: '7' },
              { name: 'All', value: '8' }
            ))
        .addIntegerOption((opt) => opt
          .setName('page')
          .setDescription('page number')
          .setRequired(false)
        ),
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();
    const baseApiUrl = process.env.SOCIAL_APP_URL + "/api/checkid";

    try {
      const userId = interaction.user.id;
      const fetchUserAddress = async () => {
        const call = `${baseApiUrl}?user_id=${encodeURIComponent(userId)}`;
        const response = await axios.get(call);
        const userAddress = response.data.duelist_address;
        return userAddress;
      }
      const userAddress = await fetchUserAddress();
      const duel_state = interaction.options.getString("duel-state") || "5";
      const true_state = parseInt(duel_state);

      const challenges: Challenge[] = await getChallengesByState(true_state);

      if (challenges.length === 0) {
        return interaction.editReply({ content: "you a noob, you ain't got no duels!" });
      }

      const enrichedChallenges = await Promise.all(challenges.map(async (challenge) => {
        const { duelist_a, duelist_b } = challenge;

        if (duelist_a === userAddress || duelist_b === userAddress) {
          try {
            const challenger = await getDuelistByAddress(duelist_a);
            const challenged = await getDuelistByAddress(duelist_b);

            return { ...challenge, duelist_a: challenger, duelist_b: challenged };
          } catch (error: any) {
            console.error(`Error processing challenge: ${error.message}`);
            return null;
          }
        } else {
          return null;
        }
      }));

      const filteredChallenges = enrichedChallenges.filter(challenge => challenge !== null) as Challenge[];

      if (filteredChallenges.length === 0) {
        return interaction.editReply({ content: "you a noob, you ain't got no duels!" });
      }

      return interaction.editReply({
        embeds: formatChallengesAsEmbeds({
          challenges: filteredChallenges,
          title: 'My Duels'
        })
      });
    }

    catch (error) {
      console.error("Failed to fetch live duels:", error);
      return interaction.editReply({ content: "An error occurred while fetching live duels." });
    }
  }
}
