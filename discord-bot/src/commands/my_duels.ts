import { Command } from "@sapphire/framework";
import { getChallengesByDuelist, ChallengeResponse } from "../queries/getChallenges.js";
import { formatAccountNotLinked } from "../formatters/messages.js";
import { fetchDuelistAddress } from "../utils/fetch_accounts.js";
import { formatChallengesPayload } from "../formatters/challenges.js";
import { ChallengeState, toChallengeState } from "../utils/constants.js";

export const stateChoices = [
  { name: 'Awaiting', value: JSON.stringify([ChallengeState.Awaiting]) },
  { name: 'Live', value: JSON.stringify([ChallengeState.InProgress]) },
  { name: 'Past', value: JSON.stringify([ChallengeState.Resolved, ChallengeState.Draw]) },
  { name: 'Resolved', value: JSON.stringify([ChallengeState.Resolved]) },
  { name: 'Draws', value: JSON.stringify([ChallengeState.Draw]) },
  { name: 'Canceled', value: JSON.stringify([ChallengeState.Expired, ChallengeState.Refused]) },
];
export const stateChoicesDefaultValue = stateChoices[1].value;

export class MyDuelsCommand extends Command {
  public constructor(context: Command.LoaderContext, options?: Command.Options) {
    super(context, {
      ...options,
      description: "List My Duels",
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder => builder
      .setName(this.name)
      .setDescription(this.description)
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
      // ),
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });
    try {
      const address = await fetchDuelistAddress(interaction.user.id);
      if (address) {
        const input_states = JSON.parse(interaction.options.getString("state") || "[]");
        console.log(`/${this.name}`, input_states);
        const states = input_states.map((v: string | number) => toChallengeState(v));
        const challenges: ChallengeResponse[] = address ? await getChallengesByDuelist(states, address) : [];
        return interaction.editReply(await formatChallengesPayload({ challenges }));
      }
    } catch (error) {
      console.error("Failed to fetch live duels:", error);
      return interaction.editReply({ content: "An error occurred while fetching live duels." });
    }
    // account not linked
    return interaction.editReply(formatAccountNotLinked());
  }
}
