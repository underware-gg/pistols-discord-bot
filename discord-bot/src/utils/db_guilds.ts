import { BigNumberish } from 'starknet';
import { bigintToHex } from './misc.js';
import { Cache } from './cache.js';
import axios from 'axios';

const TIMEOUT_MILLIS = 30 * 1000;

export type Guild = {
  guild_id: string
  notifications_channel_id: string,
  challenges_notifications: boolean,
  new_duelist_notifications: boolean,
  duelists_turn_notifications: boolean,
};

class GuildCache extends Cache<Guild> {
  constructor() {
    super('guilds', TIMEOUT_MILLIS);
  }
  async fetch(): Promise<Array<Guild>> {
    try {
      const url = process.env.SOCIAL_APP_URL + '/api/fetch_guilds';
      const response = await axios.get(url);
      return response?.data ?? [];
    } catch (error) {
      return []
    }
  }
  find(key: Partial<Guild>): Guild | null {
    for (const guild of this.cache.data) {
      if (key.guild_id && key.guild_id == guild.guild_id) {
        // console.log(`[accounts_cache] found:`, account)
        return guild;
      }
    }
    // console.log(`[accounts_cache] not found:`, key)
    return null;
  }
}

const _cache = new GuildCache()

export const fetchGuilds = async (): Promise<Array<Guild>> => {
  return await _cache.getAll();
}

export const fetchGuild = async (id: number | string): Promise<Guild | null> => {
  const guild_id = id.toString();
  const guild = await _cache.get({ guild_id });
  // console.log(`FETCH [${guild_id}]`, guild)
  return guild ?? null;
}

export const fetchGuildChannelId = async (id: number | string): Promise<string | null> => {
  const guild_id = id.toString();
  const guild = await _cache.get({ guild_id });
  // console.log(`FETCH [${guild_id}]`, guild)
  return guild?.notifications_channel_id || null;
}

export const setGuild = async (params: any): Promise<boolean> => {
  _cache.invalidate();
  try {
    const url = process.env.SOCIAL_APP_URL + '/api/settings';
    await axios.post(url, params);
    return true;
  } catch (error) {
    console.log(`setGuild() error:`, error)
  }
  return false;
}
