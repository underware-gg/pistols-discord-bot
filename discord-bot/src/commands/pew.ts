import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, Message } from 'discord.js';

@ApplyOptions<Command.Options>({
  description: 'pew pew'
})
export class UserCommand extends Command {
  // Register Chat Input and Context Menu command
  public override registerApplicationCommands(registry: Command.Registry) {
    // Create shared integration types and contexts
    // These allow the command to be used in guilds and DMs
    const integrationTypes: ApplicationIntegrationType[] = [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall];
    const contexts: InteractionContextType[] = [
      InteractionContextType.BotDM,
      InteractionContextType.Guild,
      InteractionContextType.PrivateChannel
    ];

    // Register Chat Input command
    registry.registerChatInputCommand({
      name: this.name,
      description: this.description,
      integrationTypes,
      contexts
    });

    // Register Context Menu command available from any message
    registry.registerContextMenuCommand({
      name: this.name,
      type: ApplicationCommandType.Message,
      integrationTypes,
      contexts
    });

    // Register Context Menu command available from any user
    registry.registerContextMenuCommand({
      name: this.name,
      type: ApplicationCommandType.User,
      integrationTypes,
      contexts
    });
  }

  // Message command
  public override async messageRun(message: Message) {
    return this.sendPew(message);
  }

  // Chat Input (slash) command
  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    return this.sendPew(interaction);
  }

  // Context Menu command
  public override async contextMenuRun(interaction: Command.ContextMenuCommandInteraction) {
    return this.sendPew(interaction);
  }

  private async sendPew(interactionOrMessage: Message | Command.ChatInputCommandInteraction | Command.ContextMenuCommandInteraction) {
    const pewMessage =
      interactionOrMessage instanceof Message
        ? interactionOrMessage.channel?.isSendable() && (await interactionOrMessage.channel.send({ content: 'Pew?' }))
        : await interactionOrMessage.reply({ content: 'Pew?', fetchReply: true });

    if (!pewMessage) return;

    // const botLatency = this.container.client.ws.pew;
    // const apiLatency = pewMessage.createdTimestamp - interactionOrMessage.createdTimestamp;
    // const content = `Pew pew! Bot Latency ${botLatency}ms. API Latency ${apiLatency}ms.`;
    const content = `Pew pew!`;

    this.container.logger.info(`[${interactionOrMessage.member?.user.username}@${interactionOrMessage.guild?.name}]:`, content);

    if (interactionOrMessage instanceof Message) {
      return pewMessage.edit({ content });
    }

    return interactionOrMessage.editReply({
      content
    });
  }
}
