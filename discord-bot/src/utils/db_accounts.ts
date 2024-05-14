import { BigNumberish } from 'starknet';
import { bigintToHex } from './misc.js';
import { Cache } from './cache.js';
import axios from 'axios';

const TIMEOUT_MILLIS = 30 * 1000;

type Account = {
  discord_id: string
  duelist_address: string
};

class AccountCache extends Cache<Account> {
  constructor() {
    super('accounts', TIMEOUT_MILLIS);
  }
  async fetch(): Promise<Array<Account>> {
    try {
      const url = process.env.SOCIAL_APP_URL + '/api/fetch_accounts';
      const response = await axios.get(url);
      return response?.data ?? [];
    } catch(error) {
      return []
    }
  }
  find(key: Partial<Account>): Account | null {
    for (const account of this.cache.data) {
      if (
        (key.discord_id && key.discord_id == account.discord_id) ||
        (key.duelist_address && key.duelist_address == account.duelist_address)
      ) {
        // console.log(`[accounts_cache] found:`, account)
        return account;
      }
    }
    // console.log(`[accounts_cache] not found:`, key)
    return null;
  }
}

const _cache = new AccountCache()

export const fetchDuelistAddress = async (id: number | string): Promise<string | null> => {
  const discord_id = id.toString()
  const account = await _cache.get({ discord_id });
  return account?.duelist_address ?? null;
}

export const fetchDiscordId = async (address: BigNumberish): Promise<string | null> => {
  const duelist_address = bigintToHex(address);
  const account = await _cache.get({ duelist_address });
  return account?.discord_id ?? null;
}

export const tagDuelist = async (address: BigNumberish): Promise<any> => {
  const discord_id = await fetchDiscordId(address);
  const tag = discord_id ? `<@${discord_id}>` : null
  return {
    discord_id,
    tag,
  }
}
