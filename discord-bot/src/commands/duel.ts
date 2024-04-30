import { Command } from "@sapphire/framework";
import { getChallengesById } from "../queries/getChallenges.js";
import { getDuelistByAddress } from '../queries/getDuelists.js';
import { formatDuelsAsEmbeds } from "../utils/challenges.js";
import { Challenge } from "../generated/graphql.js";


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
            const allChallenges: Challenge[] = await getChallengesById(duel_id);
            const relevantChallenges = allChallenges.filter(challenge =>
                challenge.duel_id == duel_id
            );

            if (relevantChallenges.length === 0) {
                return interaction.editReply({ content: "No duel found!" });
            }

            const enrichedChallenges = await Promise.all(relevantChallenges.map(async (challenge) => {
                const challenger = await getDuelistByAddress(challenge.duelist_a);
                const challenged = await getDuelistByAddress(challenge.duelist_b);
                return { ...challenge, duelist_a: challenger, duelist_b: challenged };
            }));

            // console.log(enrichedChallenges);
            return interaction.editReply({
                embeds: formatDuelsAsEmbeds({
                    challenges: enrichedChallenges,
                    title: `Duel ${duel_id?.substring(0, 6)}`
                })
            });

        } catch (error) {
            console.error("Failed to fetch specified duel:", error);
            return interaction.editReply({ content: "An error occurred while fetching duels." });
        }
    }
}

