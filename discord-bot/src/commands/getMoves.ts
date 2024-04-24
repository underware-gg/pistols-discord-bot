import { Command } from "@sapphire/framework";
import { getChallenges } from "../queries/getMoves";

export class Moves extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, { ...options, description: "Get moves remaining" });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder //
                .setName(this.name)
                .setDescription(this.description)
                .addStringOption((builder) =>
                    builder //
                        .setName("address")
                        .setDescription("Get moves remaining")
                        .setRequired(true)
                )
        );
    }

    public override async chatInputRun(
        interaction: Command.ChatInputCommandInteraction
    ) {
        const address = interaction.options.getString("address");

        await interaction.deferReply();

        const moves = await getChallenges(address || "");

        if (moves.challengeModels?.edges) {
            moves.challengeModels?.edges.forEach((move: any) => {
                return interaction.editReply({
                    content: `${address}: ` + move?.node?.remaining,
                });
            });
        } else {
            return interaction.editReply({
                content: "No moves found",
            });
        }
    }
}
