import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { ButtonInteraction } from 'discord.js';
import { BigNumberish } from 'starknet';
import { ChallengeState } from '../utils/constants.js';
import { Challenge } from '../generated/graphql.js';
import { getChallengesByState } from '../queries/getChallenges.js';
import { getDuelistByAddress } from '../queries/getDuelists.js';
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
    // console.log(`INTERACTION:`, interaction.customId, customId, address, state)
    if (customId === 'duelist_duels' && address && state) {
      return this.some({ address, state });
    }
    return this.none();
  }

  public async run(interaction: ButtonInteraction, options: any) {
    const { address, state } = options;

    try {


      //-----------------------------------
      // TODO: GET THIS FROM duels_by_duelist.ts
      //

      const allChallenges: Challenge[] = await getChallengesByState(ChallengeState.InProgress);
      const relevantChallenges = allChallenges.filter(challenge =>
        challenge.duelist_a === address || challenge.duelist_b === address
      );

      if (relevantChallenges.length === 0) {
        await interaction.reply({ content: "No duels found for this duelist!" });
        return;
      }

      // Fetching duelist data for each challenge and the profile of the duelist
      const enrichedChallenges = await Promise.all(relevantChallenges.map(async (challenge) => {
        const challenger = await getDuelistByAddress(challenge.duelist_a);
        const challenged = await getDuelistByAddress(challenge.duelist_b);
        return { ...challenge, duelist_a: challenger, duelist_b: challenged };
      }));

      //
      //-----------------------------------
      

      await interaction.reply({
        embeds: formatChallengesAsEmbeds({
          challenges: enrichedChallenges,
          title: `Live Duels by ${address?.substring(0, 6)}`
        }),
        ephemeral: true // private to the person who pressed the button
      });
      console.log(`---6`)

    } catch (error) {
      console.error("Failed to fetch duels for the specified duelist:", error);
      await interaction.reply({ content: "An error occurred while fetching duels." });
      console.log(`---7`)
      return;
    }

    console.log(`---8`)

  }
}

export const duelist_duels_builder = (address: BigNumberish, state: ChallengeState):string => {
  return `duelist_duels;${address};${state}`;
}