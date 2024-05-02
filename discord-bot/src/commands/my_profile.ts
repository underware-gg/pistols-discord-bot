import { Command } from "@sapphire/framework";
import { getDuelistByAddress, DuelistResponse } from "../queries/getDuelists.js";
import { formatDuelistPayload } from "../utils/duelists.js";
import { fetchDuelistAddress } from "../utils/social_app.js";

export class DuelistsCommand extends Command {
  public constructor(
    context: Command.LoaderContext,
    options?: Command.Options
  ) {
    super(context, {
      ...options,
      description: "Display your Duelist Profile",
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    const address = await fetchDuelistAddress(interaction.user.id);

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
