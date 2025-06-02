import './lib/setup.js';

import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({
  defaultPrefix: '!',
  caseInsensitiveCommands: true,
  logger: {
    level: LogLevel.Debug
  },
  intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
  loadMessageCommandListeners: true
});

const main = async () => {
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
