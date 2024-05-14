import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { ButtonInteraction, InteractionReplyOptions } from 'discord.js';
import { button_interactions } from '../interactions/index.js';

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
      for (const inter of button_interactions) {
        if (inter().customId == customId) {
          console.log(`/${this.name}:`, options);
          return this.some(options);
        }
      }
    } catch(error) {
      console.log(`/${this.name}: ERROR:`, error);
    }
    console.log(`/${this.name}: Unknown interaction:`, interaction.customId);
    return this.none();
  }

  public async run(interaction: ButtonInteraction, options: string[]) {
    await interaction.deferReply({ ephemeral: true });
    try {
      const [customId] = options;
      let reply: InteractionReplyOptions | null = null;
      for (const inter of button_interactions) {
        if (inter().customId == customId) {
          reply = {
            ...await inter().run(interaction, options),
            ephemeral: inter().ephemeral ?? false,
          }
          break;
        }
      }
      if (reply) {
        await interaction.editReply(reply);
      } else {
        await interaction.editReply({
          content: `Interaction [${this.name}] is invalid: ${interaction.customId}`,
        });
      }
    } catch (error) {
      console.error(`Interaction [${this.name}] ERROR:`, error);
      await interaction.editReply({ content: `Interaction [${this.name}] ERROR:` });
    }
  }
}
