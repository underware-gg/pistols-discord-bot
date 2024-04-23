import { Command } from "@sapphire/framework";
import { getMoves } from "../queries/getMoves";
export class Moves extends Command {
    constructor(context, options) {
        super(context, { ...options, description: "Get moves remaining" });
    }
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => builder //
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption((builder) => builder //
            .setName("address")
            .setDescription("Get moves remaining")
            .setRequired(true)));
    }
    async chatInputRun(interaction) {
        const address = interaction.options.getString("address");
        await interaction.deferReply();
        const moves = await getMoves(address || "");
        if (moves.movesModels?.edges) {
            moves.movesModels?.edges.forEach((move) => {
                return interaction.editReply({
                    content: `${address}: ` + move?.node?.remaining,
                });
            });
        }
        else {
            return interaction.editReply({
                content: "No moves found",
            });
        }
    }
}
