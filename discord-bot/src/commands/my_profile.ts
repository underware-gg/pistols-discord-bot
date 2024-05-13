import { Command } from "@sapphire/framework";
import { getDuelistByAddress, DuelistResponse } from "../queries/getDuelists.js";
import { fetchDuelistAddress } from "../utils/fetch_accounts.js";
import { formatDuelistPayload } from "../formatters/duelists.js";
import { formatAccountNotLinked } from "../formatters/messages.js";

export class MyProfileCommand extends Command {
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
    await interaction.deferReply({ ephemeral: true });
    try {
      const address = await fetchDuelistAddress(interaction.user.id);
      console.log(`/${this.name}`, address);
      if (address) {
        const duelist: DuelistResponse | null = await getDuelistByAddress(address);
        if (duelist) {
          const payload = await formatDuelistPayload({
            duelist,
            title: "Duelist",
          });
          return interaction.editReply(payload);
        }
      }
    } catch (error) {
      console.error("Error fetching duelist:", error);
      return interaction.editReply({
        content: "An error occurred while fetching the duelist.",
      });
    }
    // account not linked
    return interaction.editReply(formatAccountNotLinked());
  }
}
