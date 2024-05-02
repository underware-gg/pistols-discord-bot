import { Command } from "@sapphire/framework";
import { getChallengesById, ChallengeResponse } from "../queries/getChallenges.js";
import { formatChallengesAsEmbeds } from "../utils/challenges.js";


export class Duels_By_DuelistCommand extends Command {
  public constructor(context: Command.LoaderContext, options?: Command.Options) {
    super(context, {
      ...options,
      description: "display a specific duel",
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder =>
      builder
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
    const duel_id = interaction.options.getString("duel_id");

    await interaction.deferReply();

    try {
      const challenges: ChallengeResponse[] = await getChallengesById(duel_id);

      if (challenges.length === 0) {
        return interaction.editReply({ content: "No duel found!" });
      }

      return interaction.editReply({
        embeds: await formatChallengesAsEmbeds({
          challenges,
        })
      });

    } catch (error) {
      console.error("Failed to fetch specified duel:", error);
      return interaction.editReply({ content: "An error occurred while fetching duels." });
    }
  }
}

