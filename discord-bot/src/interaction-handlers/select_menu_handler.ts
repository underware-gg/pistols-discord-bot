import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { AnySelectMenuInteraction, InteractionReplyOptions } from 'discord.js';
import { select_menu_interactions } from '../interactions/index.js';

export class SelectMenuHandler extends InteractionHandler {
  public constructor(ctx: InteractionHandler.LoaderContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.SelectMenu
    });
  }

  public override parse(interaction: AnySelectMenuInteraction) {
    try {
      const options = interaction.customId.split(';');
      const [customId] = options;
      for (const inter of select_menu_interactions) {
        if (inter().customId == customId) {
          console.log(`/${this.name}:`, options);
          return this.some([
            ...options,
            ...interaction.values,
          ]);
        }
      }
    } catch (error) {
      console.log(`/${this.name}: ERROR:`, error);
    }
    console.log(`/${this.name}: Unknown interaction:`, interaction.customId);
    return this.none();
  }

  public async run(interaction: AnySelectMenuInteraction, options: string[]) {
    try {
      const [customId] = options;
      let reply: InteractionReplyOptions | null = null;
      for (const inter of select_menu_interactions) {
        if (inter().customId == customId) {
          reply = {
            ...await inter().run(interaction, options),
            ephemeral: inter().ephemeral ?? false,
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
