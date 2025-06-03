import { GatewayIntentBits } from 'discord.js';
import { container, LogLevel, SapphireClient } from '@sapphire/framework';
import { PistolsSchemaType } from '@underware/pistols-sdk/pistols/node';
import { init_sdk, dojoConfig } from './dojoConfig.js';
import { SDK } from '@dojoengine/sdk';

//
// Custom Sapphire client with Dojo SDK
// from: https://www.sapphirejs.dev/docs/Guide/additional-information/using-and-extending-container
//
export class DojoSapphireClient extends SapphireClient {
  public constructor() {
    // We call super our options
    super({
      logger: {
        level: LogLevel.Debug
      },
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
      ],
      loadMessageCommandListeners: true
    });
  }

  // We override login to inti the SDK and then login to Discord
  public override async login(token?: string) {
    container.sdk = await init_sdk();
    this.logger.info('Dojo SDK initialized with config:', dojoConfig);
    return super.login(token);
  }

  // public override async destroy() {
  //   await container.sdk.destroy();
  //   return super.destroy();
  // }

}

declare module '@sapphire/pieces' {
  interface Container {
    sdk: SDK<PistolsSchemaType>;
  }
}
