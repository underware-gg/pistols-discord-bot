import { Command } from "@sapphire/framework";
import { getChallengesByState } from "../queries/getChallenges.js";
import { getDuelistByAddress } from '../queries/getDuelists.js';
import { formatChallengesAsEmbeds } from "../utils/challenges.js";
import { ChallengeState } from "../utils/constants.js";
import { Challenge } from "../generated/graphql.js";

export class LiveDuelsCommand extends Command {
    public constructor(context: Command.LoaderContext, options?: Command.Options) {
        super(context, {
            ...options,
            description: "List Live Duels",
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand(builder =>
            builder
                .setName(this.name)
                .setDescription(this.description)
        );
    }

    public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        await interaction.deferReply();

        try {
            const challenges: Challenge[] = await getChallengesByState(ChallengeState.InProgress);

            if (challenges.length === 0) {
                return interaction.editReply({ content: "No live duels found!" });
            }

            // Fetching duelist data for each challenge
            const enrichedChallenges = await Promise.all(challenges.map(async (challenge) => {
                const challenger = await getDuelistByAddress(challenge.duelist_a);
                const challenged = await getDuelistByAddress(challenge.duelist_b);
                return { ...challenge, duelist_a: challenger, duelist_b: challenged };
            }));

            return interaction.editReply({
                embeds: formatChallengesAsEmbeds({
                    challenges: enrichedChallenges,
                    title: 'Live Duel'
                })
            });

        } catch (error) {
            console.error("Failed to fetch live duels:", error);
            return interaction.editReply({ content: "An error occurred while fetching live duels." });
        }
    }
}
