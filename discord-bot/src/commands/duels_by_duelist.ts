import { Command } from "@sapphire/framework";
import { getChallengesByDuelist, ChallengeResponse } from "../queries/getChallenges.js";
import { formatChallengesPayload } from "../formatters/challenges.js";
import { ChallengeState, toChallengeState } from "../utils/constants.js";
import { stateChoices } from "./my_duels.js";

export class Duels_By_DuelistCommand extends Command {
  public constructor(context: Command.LoaderContext, options?: Command.Options) {
    super(context, {
      ...options,
      description: "List live duels by a duelist",
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder => builder
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((opt) => opt
        .setName("address")
        .setDescription("Duelist Address")
        .setRequired(true)
      )
      .addStringOption(option => option
        .setName('state')
        .setDescription('Which duels to list')
        .setRequired(true)
        .addChoices(...stateChoices)
      )
      // .addIntegerOption((opt) => opt
      //   .setName('page')
      //   .setDescription('page number')
      //   .setRequired(false)
      // )
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const address = interaction.options.getString("address");
      const input_states = JSON.parse(interaction.options.getString("state") || "[]");
      const states = input_states.map((v: string | number) => toChallengeState(v));

      const challenges: ChallengeResponse[] = address ? await getChallengesByDuelist(states, address) : [];
      if (challenges.length === 0) {
        return interaction.editReply({ content: "No duels found for this duelist!" });
      }

      return interaction.editReply(await formatChallengesPayload({ challenges }));

    } catch (error) {
      console.error("Failed to fetch duels for the specified duelist:", error);
      return interaction.editReply({ content: "An error occurred while fetching duels." });
    }
  }
}
