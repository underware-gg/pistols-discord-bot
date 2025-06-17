// required
export const NETWORK_ID = process.env.NETWORK_ID || undefined;
// dojo config overrides
export const SLOT_NAME = process.env.SLOT_NAME || undefined;
// social links
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN || undefined;
export const APPLICATION_ID = process.env.APPLICATION_ID || undefined;

if (!APPLICATION_ID) {
  throw new Error('Missing environment variables: DISCORD_TOKEN');
}
if (!DISCORD_TOKEN) {
  throw new Error('Missing environment variables: APPLICATION_ID');
}
