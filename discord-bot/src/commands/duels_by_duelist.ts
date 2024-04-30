import { Command } from "@sapphire/framework";
import { getChallengesByState } from "../queries/getChallenges.js";
import { getDuelistByAddress } from '../queries/getDuelists.js';
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
            const allChallenges: Challenge[] = await getChallengesByState(ChallengeState.InProgress);
            const relevantChallenges = allChallenges.filter(challenge =>
                challenge.duelist_a === address || challenge.duelist_b === address
            );

            if (relevantChallenges.length === 0) {
                return interaction.editReply({ content: "No duels found for this duelist!" });
            }

            // Fetching duelist data for each challenge and the profile of the duelist
            const enrichedChallenges = await Promise.all(relevantChallenges.map(async (challenge) => {
                const challenger = await getDuelistByAddress(challenge.duelist_a);
                const challenged = await getDuelistByAddress(challenge.duelist_b);
                return { ...challenge, duelist_a: challenger, duelist_b: challenged };
            }));

            return interaction.editReply({
                embeds: formatChallengesAsEmbeds({
                    challenges: enrichedChallenges,
                    title: `Live Duels by ${address?.substring(0, 6)}`
                })
            });

        } catch (error) {
            console.error("Failed to fetch duels for the specified duelist:", error);
            return interaction.editReply({ content: "An error occurred while fetching duels." });
        }
    }
}

