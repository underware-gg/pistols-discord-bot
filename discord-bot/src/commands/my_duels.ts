import { Command } from "@sapphire/framework";
import { getChallengesByDuelist, ChallengeResponse } from "../queries/getChallenges.js";
import { formatChallengesAsEmbeds } from "../formatters/challenges.js";
import { fetchDuelistAddress } from "../utils/social_app.js";
import { ChallengeState, toChallengeState } from "../utils/constants.js";

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
              { name: 'Awaiting', value: JSON.stringify([ChallengeState.Awaiting]) },
              { name: 'Live', value: JSON.stringify([ChallengeState.InProgress]) },
              { name: 'Past', value: JSON.stringify([ChallengeState.Resolved, ChallengeState.Draw]) },
              { name: 'Resolved', value: JSON.stringify([ChallengeState.Resolved]) },
              { name: 'Draws', value: JSON.stringify([ChallengeState.Draw]) },
              { name: 'Canceled', value: JSON.stringify([ChallengeState.Expired, ChallengeState.Refused]) },
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
      const input_states = JSON.parse(interaction.options.getString("duel-state") || "[]");
      const states = input_states.map((v: string | number) => toChallengeState(v));

      const challenges: ChallengeResponse[] = address ? await getChallengesByDuelist(states, address) : [];

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
