import { Command } from "@sapphire/framework";
import { getChallengesByDuelist } from "../queries/getChallenges.js";
import { formatChallengesAsEmbeds } from "../utils/challenges.js";
import { ChallengeState } from "../utils/constants.js";
import { Challenge } from "../generated/graphql.js";

export class Duels_By_DuelistCommand extends Command {
  public constructor(context: Command.LoaderContext, options?: Command.Options) {
    super(context, {
      ...options,
      description: "List live duels by a duelist",
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((opt) => opt
          .setName("address")
          .setDescription("Duelist Address")
          .setRequired(true)
        )
        .addIntegerOption((opt) => opt
          .setName('page')
          .setDescription('page number')
          .setRequired(false)
        )
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const address = interaction.options.getString("address");

    await interaction.deferReply();

    try {
      const challenges: Challenge[] = address ? await getChallengesByDuelist(ChallengeState.InProgress, address) : [];

      if (challenges.length === 0) {
        return interaction.editReply({ content: "No duels found for this duelist!" });
      }

      return interaction.editReply({
        embeds: await formatChallengesAsEmbeds({
          challenges,
          title: `Live Duels by ${address?.substring(0, 6)}`
        })
      });

    } catch (error) {
      console.error("Failed to fetch duels for the specified duelist:", error);
      return interaction.editReply({ content: "An error occurred while fetching duels." });
    }
  }
}
