import './lib/setup.js';
import { DojoSapphireClient } from './lib/client.js';
import * as ENV from './lib/env.js';

const client = new DojoSapphireClient();

const main = async () => {
  try {
    await client.login(ENV.DISCORD_TOKEN);
    client.logger.info('logged in');
  } catch (error) {
    client.logger.fatal(error);
    await client.destroy();
    process.exit(1);
  }
};

void main();
