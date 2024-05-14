import { Command } from "@sapphire/framework";
import { PermissionFlagsBits } from 'discord.js';
import { formatSettingsMessage } from "../formatters/admin.js";

export class MyDuelsCommand extends Command {
  public constructor(context: Command.LoaderContext, options?: Command.Options) {
    super(context, {
      ...options,
      description: "Bot Settings (administrators only)",
      requiredUserPermissions: PermissionFlagsBits.Administrator,
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(builder => builder
      .setName(this.name)
      .setDescription(this.description)
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });
    try {
      const isAdmin = true;
      if (isAdmin) {
        return interaction.editReply(await formatSettingsMessage(interaction.guild?.id ?? null));
      }
    } catch (error) {
      console.error("Failed check user roles:", error);
      return interaction.editReply({ content: "An error occurred while fetching user roles." });
    }
    // account not linked
    return interaction.editReply({ content: "You're not an admin!" });
  }
}
