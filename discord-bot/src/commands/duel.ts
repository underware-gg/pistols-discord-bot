import { Command } from "@sapphire/framework";
import { getChallengesById, ChallengeResponse } from "../queries/getChallenges.js";
import { formatChallengesPayload } from "../formatters/challenges.js";

export class DuelCommand extends Command {
  public constructor(context: Command.LoaderContext, options?: Command.Options) {
    super(context, {
      ...options,
      description: "display a specific duel",
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder => builder
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((opt) => opt
        .setName("duel_id")
        .setDescription("duel_id")
        .setRequired(true)
      )
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });
    try {
      const duel_id = interaction.options.getString("duel_id");
      const challenges: ChallengeResponse[] = await getChallengesById(duel_id);
      return interaction.editReply(await formatChallengesPayload({ challenges }));
    } catch (error) {
      console.error("Failed to fetch specified duel:", error);
      return interaction.editReply({ content: "An error occurred while fetching duels." });
    }
  }
}

