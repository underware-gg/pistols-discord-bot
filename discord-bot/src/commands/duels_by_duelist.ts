import { Command } from "@sapphire/framework";
import { getChallengesByState } from "../queries/getChallenges.js";
import { getDuelistByAddress } from '../queries/getDuelists.js';
import { formatChallengesAsEmbeds } from "../utils/challenges.js";
import { ChallengeState } from "../utils/constants.js";
import { Challenge } from "../generated/graphql.js";
import axios from "axios";

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
        const userId = interaction.user.id;

        await interaction.deferReply();

        try {
            const userAddress = async () => {
                const call = `http://localhost:3000/api/checkid?user_id=${encodeURIComponent(userId)}`;
                const response = await axios.get(call);
                const userAddress = response.data.duelist_address;
                return userAddress;
            };
            const userAddressResult = await userAddress();

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

            const duelists = await Promise.all(enrichedChallenges.map(async (challenge) => {
                const challenger = challenge.duelist_a?.address;
                const challenged = challenge.duelist_b?.address;

                // Check if either duelist matches the user's address
                if (challenger === address || challenged === address) {
                    return challenger || challenged;
                } else {
                    return null;
                }
            }));

            const discordIds = [];
            for (const duelist of duelists) {
                const discordIdResult = await fetchDiscordId(duelist);
                discordIds.push(discordIdResult);
            }

            const validDiscordIds = discordIds.filter(Boolean); // Filter out null or undefined values
            const content = validDiscordIds.length > 0 ? validDiscordIds.map(discordId => `<@${discordId}>`).join(' ') : '';

            return interaction.editReply({
                content: content || `<@${userId}>`,
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

async function fetchDiscordId(duelistAddress: string | undefined): Promise<string | null> {
    try {
        const apiUrl = `http://localhost:3000/api/checkuser?duelist_address=${encodeURIComponent(duelistAddress?.toString() ?? '')}`;
        const response = await axios.get(apiUrl);

        if (response.status === 404) {
            console.log('Account not found for duelist:', duelistAddress);
            return null;
        } else {
            const { discord_id } = response.data;
            return discord_id;
        }
    } catch (error: any) {
        console.error('Error fetching discord id:', error.message);
        return null;
    }
}
