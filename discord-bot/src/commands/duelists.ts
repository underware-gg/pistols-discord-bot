import { Command } from "@sapphire/framework";
import { getDuelist } from "../queries/getDuelists.js";
import { formatDuelistsAsEmbeds } from "../utils/duelists.js";
import { Duelist } from "../generated/graphql.js";
import { bigintToHex } from "../utils/misc.js";

export class DuelistsCommand extends Command {
  public constructor(
    context: Command.LoaderContext,
    options?: Command.Options
  ) {
    super(context, {
      ...options,
      description: "List Live Duelists",
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
      const duelist: Duelist | null = await getDuelist(address);

      if (duelist) {
        const embeds = formatDuelistsAsEmbeds({
          duelists: [duelist],
          title: "Duelist",
        });
        return interaction.editReply({ embeds });
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
