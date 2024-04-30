import { Command } from "@sapphire/framework";
import { getChallengesByState } from "../queries/getChallenges.js";
import { ChallengeState } from "../utils/constants.js";
import { formatChallengesAsEmbeds } from "../utils/challenges.js";
import { Challenge } from "../generated/graphql.js";

//
// Slash command
//
// saffire command reference:
// https://www.sapphirejs.dev/docs/Guide/getting-started/creating-a-basic-app-command
// https://github.com/sapphiredev/examples/blob/main/examples/with-typescript-starter/src/commands/ping.ts
//
// discord command builder reference:
// https://discordjs.guide/slash-commands/advanced-creation.html
//

export class LiveDuelsCommand extends Command {
  public constructor(
    context: Command.LoaderContext,
    options?: Command.Options
  ) {
    super(context, {
      ...options,
      description: "List Live Duels",
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) => builder.setName(this.name).setDescription(this.description)
      // .addStringOption((builder) => builder
      //     .setName("address")
      //     .setDescription("Duelist Address")
      //     .setRequired(true)
      // )
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    // const address = interaction.options.getString("address");

    const state = ChallengeState.InProgress;

    await interaction.deferReply();

    const challenges: Challenge[] = await getChallengesByState(state);

    if (challenges) {
      return interaction.editReply({
        // content: formatChallengesAsText(challenges),
        embeds: formatChallengesAsEmbeds({
          challenges,
          title: "Live Duels",
        }),
      });
    } else {
      return interaction.editReply({
        content: "No duels found!",
      });
    }
  }
}
