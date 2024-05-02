import { Command } from "@sapphire/framework";
import { getChallengesByState, ChallengeResponse } from "../queries/getChallenges.js";
import { formatChallengesAsEmbeds } from "../formatters/challenges.js";
import { ChallengeState } from "../utils/constants.js";

export class LiveDuelsCommand extends Command {
  public constructor(context: Command.LoaderContext, options?: Command.Options) {
    super(context, {
      ...options,
      description: "List Live Duels",
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder => builder
      .setName(this.name)
      .setDescription(this.description)
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const challenges: ChallengeResponse[] = await getChallengesByState([ChallengeState.InProgress]);

      if (challenges.length === 0) {
        return interaction.editReply({ content: "No live duels found!" });
      }

      return interaction.editReply({
        embeds: await formatChallengesAsEmbeds({
          challenges,
        })
      });

    } catch (error) {
      console.error("Failed to fetch live duels:", error);
      return interaction.editReply({ content: "An error occurred while fetching live duels." });
    }
  }
}
