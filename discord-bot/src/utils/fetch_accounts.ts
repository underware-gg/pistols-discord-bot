import { BigNumberish } from 'starknet';
import { bigintToHex } from './misc.js';
import axios from 'axios';

// refresh cache every 30 seconds
const TIMEOUT_MILLIS = 30 * 1000;

type Account = {
  discord_id: string
  duelist_address: string
};
type RemoteData = Array<Account>;
type CachedValue = {
  data: RemoteData
  timestamp: number
};
class Cache {
  private cache: CachedValue;
  private timeout: number;
  constructor() {
    this.cache = {
      data: [],
      timestamp: 0,
    };
    this.timeout = TIMEOUT_MILLIS;
  }
  // set new cached value
  set(data: RemoteData) {
    // console.log(`[accounts_cache] SET:`, data)
    this.cache = {
      data,
      timestamp: Date.now(),
    }
  }
  // cache validator
  is_valid(): boolean {
    return (Date.now() - this.cache.timestamp) < this.timeout;
  }
  async find(key: Partial<Account>): Promise<Account | null> {
    if (!this.is_valid()) {
      console.log(`[accounts_cache] expired, fetch new...`)
      // fetch new
      try {
        const url = process.env.SOCIAL_APP_URL + '/api/fetch_accounts';
        const response = await axios.get(url);
        const data = response?.data ?? [];
        this.set(data);
        console.log(`[accounts_cache] fetched ${data.length} accounts.`)
      } catch (error) {
        console.warn(`[accounts_cache] fetch error!`, error);
        return null;
      }
    }
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

const _cache = new Cache()

export const fetchDuelistAddress = async (id: number | string): Promise<string | null> => {
  const discord_id = id.toString()
  const account = await _cache.find({ discord_id });
  return account?.duelist_address ?? null;
}

export const fetchDiscordId = async (address: BigNumberish): Promise<string | null> => {
  const duelist_address = bigintToHex(address);
  const account = await _cache.find({ duelist_address });
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
