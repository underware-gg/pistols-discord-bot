import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { ButtonInteraction } from 'discord.js';
import { BigNumberish } from 'starknet';
import { getChallengesByDuelist } from '../queries/getChallenges.js';
import { ChallengeState, toChallengeState } from '../utils/constants.js';
import { Challenge } from '../generated/graphql.js';
import { formatChallengesAsEmbeds } from '../utils/challenges.js';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override parse(interaction: ButtonInteraction) {
    const [customId, address, state] = interaction.customId.split(';');
    console.log(`INTERACTION:`, interaction.customId, customId, address, state)
    if (customId === 'duelist_duels' && address && state) {
      return this.some({ address, state });
    }
    return this.none();
  }

  public async run(interaction: ButtonInteraction, options: any) {
    const { address, state } = options;

    try {
      const challenges: Challenge[] = await getChallengesByDuelist(toChallengeState(state), address);

      if (challenges.length === 0) {
        await interaction.reply({ content: "No duels found for this duelist!" });
        return;
      }

      await interaction.reply({
        embeds: await formatChallengesAsEmbeds({
          challenges,
          title: `Live Duels by ${address?.substring(0, 6)}`
        }),
        ephemeral: true // private to the person who pressed the button
      });

    } catch (error) {
      console.error("Failed to fetch duels for the specified duelist:", error);
      await interaction.reply({ content: "An error occurred while fetching duels." });
      return;
    }

  }
}

export const duelist_duels_builder = (address: BigNumberish, state: ChallengeState): string => {
  return `duelist_duels;${address};${state}`;
}