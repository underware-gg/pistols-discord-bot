import EventEmitter from 'node:events';
import { GatewayIntentBits } from 'discord.js';
import { container, LogLevel, SapphireClient } from '@sapphire/framework';
import type { PistolsSchemaType } from '@underware/pistols-sdk/pistols/node';
import type { SDK } from '@dojoengine/sdk/node';
import { models, constants } from '@underware/pistols-sdk/pistols/gen';
import { init_sdk, dojoConfig, networkId, networkConfig } from './dojoConfig.js';
import { DojoNetworkConfig } from '@underware/pistols-sdk/pistols/config';

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
    container.networkConfig = networkConfig;
    container.pistols_emitter = new EventEmitter();
    container.pistols_players = {};
    container.pistols_settings = {};
    container.pistols_assets = {
      logo: 'https://assets.underware.gg/pistols/logo.png',
    };
    this.logger.info(`Dojo SDK initialized on network [${networkId}] with config:`, dojoConfig, networkConfig);
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
    networkConfig: DojoNetworkConfig;
    pistols_emitter: EventEmitter;
    pistols_players: Record<string, models.PlayerSocialLinkEvent>;
    pistols_settings: Record<string, PlayerSettings>;
    pistols_assets: {
      logo: string;
    }
  }
}

export type PlayerSettings = {
  [constants.PlayerSetting.OptOutNotifications]?: boolean
}
