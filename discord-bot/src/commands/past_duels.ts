import { Command } from "@sapphire/framework";
import { getChallengesByState, ChallengeResponse } from "../queries/getChallenges.js";
import { formatChallengesPayload } from "../formatters/challenges.js";
import { ChallengeState } from "../utils/constants.js";

export class PastDuelsCommand extends Command {
  public constructor(context: Command.LoaderContext, options?: Command.Options) {
    super(context, {
      ...options,
      description: "List recent finished Duels",
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder => builder
      .setName(this.name)
      .setDescription(this.description)
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });
    try {
      const challenges: ChallengeResponse[] = await getChallengesByState([ChallengeState.Resolved, ChallengeState.Draw]);
      return interaction.editReply(await formatChallengesPayload({ challenges }));
    } catch (error) {
      console.error("Failed to fetch live duels:", error);
      return interaction.editReply({ content: "An error occurred while fetching live duels." });
    }
  }
}
