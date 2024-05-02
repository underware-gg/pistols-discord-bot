import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { ButtonInteraction, InteractionReplyOptions } from 'discord.js';
import { interactions } from '../interactions/index.js';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override parse(interaction: ButtonInteraction) {
    try {
      const options = interaction.customId.split(';');
      const [customId] = options;
      for (const interaction of interactions) {
        if (interaction().customId == customId) {
          console.log(`Interaction [${this.name}]:`, options);
          return this.some(options);
        }
      }
    } catch {
    }
    return this.none();
  }

  public async run(interaction: ButtonInteraction, options: string[]) {
    try {
      const [customId] = options;
      let reply: InteractionReplyOptions | null = null;
      for (const interaction of interactions) {
        if (interaction().customId == customId) {
          reply = {
            ...await interaction().run(options),
            ephemeral: interaction().ephemeral ?? false,
          }
          break;
        }
      }
      if (reply) {
        await interaction.reply(reply);
      } else {
        await interaction.reply({
          content: `Interaction [${this.name}] is invalid: ${interaction.customId}`,
        });
      }
    } catch (error) {
      console.error(`Interaction [${this.name}] ERROR:`, error);
      await interaction.reply({ content: `Interaction [${this.name}] ERROR:` });
    }
  }
}
