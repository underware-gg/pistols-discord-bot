import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  // pistols/dojo
  NETWORK_ID: z.string(),
  ACCOUNT_ADDRESS: z.string().optional(),
  ACCOUNT_PRIVATE_KEY: z.string().optional(),
  // gg.xyz
  API_URL: z.string().optional().default('https://api.gg.xyz'),
  GAME_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);

  // gameAddress: parsedEnv.GAME_ADDRESS,
  // startBlock: parsedEnv.START_BLOCK,
  // apiUrl: parsedEnv.API_URL,
  // gameSecret: parsedEnv.GAME_SECRET,
