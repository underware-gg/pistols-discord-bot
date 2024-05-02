import { Command } from "@sapphire/framework";
import { getChallengesByDuelist, ChallengeResponse } from "../queries/getChallenges.js";
import { formatChallengesAsEmbeds } from "../formatters/challenges.js";
import { fetchDuelistAddress } from "../utils/social_app.js";
import { toChallengeState } from "../utils/constants.js";

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

    try {
      const address = await fetchDuelistAddress(interaction.user.id);
      const input_state = interaction.options.getString("duel-state") || "5";
      const state = toChallengeState(input_state);

      const challenges: ChallengeResponse[] = address ? await getChallengesByDuelist(state, address) : [];

      if (challenges.length === 0) {
        return interaction.editReply({ content: "you a noob, you ain't got no duels!" });
      }

      return interaction.editReply({
        embeds: await formatChallengesAsEmbeds({
          challenges,
        })
      });
    }

    catch (error) {
      console.error("Failed to fetch live duels:", error);
      return interaction.editReply({ content: "An error occurred while fetching live duels." });
    }
  }
}
