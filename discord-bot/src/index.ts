import './lib/setup.js';
import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import { init_sdk, dojoConfig } from './lib/dojoConfig.js';

const client = new SapphireClient({
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

const main = async () => {
  const sdk = await init_sdk();
  client.logger.info('Dojo SDK initialized with config:', dojoConfig);

  try {
    await client.login(process.env.DISCORD_TOKEN);
    client.logger.info('logged in');
  } catch (error) {
    client.logger.fatal(error);
    await client.destroy();
    process.exit(1);
  }
};

void main();
