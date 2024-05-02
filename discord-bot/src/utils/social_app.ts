import { BigNumberish } from 'starknet';
import { bigintToHex } from './misc.js';
import axios from 'axios';

const TIMEOUT_MINUTES = 2;

type CacheStorage = {
  [key: string]: CachedValue
}
type RemoteData = {
  discord_id: string
  duelist_address: string
  burner_data: any | null
}
type CachedValue = {
  data: RemoteData | null
  timestamp: number
}
class Cache {
  private cache: CacheStorage
  private timeout: number
  constructor() {
    this.cache = {}
    this.timeout = TIMEOUT_MINUTES * 60 * 1000;
  }
  // set new cached value
  set(key: string, data: RemoteData | null) {
    if (key) {
      // console.log(`cached[${key}] SET:`, data)
      this.cache[key] = {
        data,
        timestamp: Date.now(),
      }
    }
  }
  // find cached values
  find_duelist_address(key: string): string | null | undefined {
    const data = this.return_data(key);
    return data ? data.duelist_address : data;
  }
  find_discord_id(key: string): string | null | undefined {
    const data = this.return_data(key);
    return data ? data.discord_id : data;
  }
  // cache validator
  is_valid(key: string): boolean {
    const cached = this.cache[key]
    return (Date.now() - cached.timestamp) < this.timeout;
  }
  return_data(key: string): RemoteData | null | undefined {
    const data: RemoteData | null | undefined = this.cache[key]?.data;
    if (data !== undefined) {
      if (this.is_valid(key)) {
        // console.log(`cached[${key}] is valid:`, data)
        return data;
      }
      // console.log(`cached[${key}] EXPIRED!`)
      delete this.cache[key];
    }
    return undefined;
  }
}

const _cache = new Cache()

export const fetchDuelistAddress = async (id: number | string): Promise<string | null> => {
  const discord_id = id.toString()
  // return cached
  const cached_value = _cache.find_duelist_address(discord_id);
  if (cached_value !== undefined) return cached_value;
  // fetch new
  const url = process.env.SOCIAL_APP_URL + '/api/fetch_id?' + new URLSearchParams({ discord_id })
  let data = null
  let result = null
  try {
    const response = await axios.get(url);
    data = response?.data ?? null;
    result = data?.duelist_address ?? null;
  } catch (error) {
    // not found
  }
  _cache.set(discord_id, data)
  return result;
}

export const fetchDiscordId = async (address: BigNumberish): Promise<string | null> => {
  const duelist_address = bigintToHex(address);
  // return cached
  const cached_value = _cache.find_discord_id(duelist_address);
  if (cached_value !== undefined) return cached_value;
  // fetch new
  const url = process.env.SOCIAL_APP_URL + '/api/fetch_address?' + new URLSearchParams({ duelist_address })
  let data = null
  let result = null
  try {
    const response = await axios.get(url);
    data = response?.data ?? null;
    result = data?.discord_id ?? null;
  } catch (error) {
    // not found
  }
  _cache.set(duelist_address, data)
  return result;
}

export const tagDuelist = async (address: BigNumberish): Promise<any> => {
  const discord_id = await fetchDiscordId(address);
  const tag = discord_id ? `<@${discord_id}>` : null
  return {
    discord_id,
    tag,
  }
}
