import { Command } from "@sapphire/framework";
import { getDuelistByAddress, DuelistResponse } from "../queries/getDuelists.js";
import { formatDuelistPayload } from "../formatters/duelists.js";

export class DuelistsCommand extends Command {
  public constructor(
    context: Command.LoaderContext,
    options?: Command.Options
  ) {
    super(context, {
      ...options,
      description: "Display a Duelist Profile",
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((builder) =>
          builder
            .setName("address")
            .setDescription("Duelist Address")
            .setRequired(true)
        )
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    const address = interaction.options.getString("address");

    await interaction.deferReply();

    if (!address) {
      return interaction.editReply({ content: "Invalid address provided!" });
    }

    try {
      const duelist: DuelistResponse | null = await getDuelistByAddress(address);

      if (duelist) {
        const payload = await formatDuelistPayload({
          duelist,
          title: "Duelist",
        });
        return interaction.editReply(payload);
      } else {
        return interaction.editReply({ content: "No duelist found!" });
      }
    } catch (error) {
      console.error("Error fetching duelist:", error);
      return interaction.editReply({
        content: "An error occurred while fetching the duelist.",
      });
    }
  }
}
