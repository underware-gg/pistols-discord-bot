import { BigNumberish } from 'starknet';
import { bigintToHex } from './misc.js';
import axios from 'axios';

export const fetchDuelistAddress = async (id: number | string): Promise<string | null> => {
  const discord_id = id.toString()
  const url = process.env.SOCIAL_APP_URL + '/api/fetch_id?' + new URLSearchParams({ discord_id })
  let duelist_address = null
  try {
    const response = await axios.get(url);
    duelist_address = response?.data?.duelist_address ?? null;
  } catch (error) {
    // not found
  }
  return duelist_address;
}

export const fetchDiscordId = async (address: BigNumberish): Promise<string | null> => {
  const duelist_address = bigintToHex(address);
  const url = process.env.SOCIAL_APP_URL + '/api/fetch_address?' + new URLSearchParams({ duelist_address })
  let discord_id = null
  try {
    const response = await axios.get(url);
    discord_id = response?.data?.discord_id ?? null;
  } catch (error) {
    // not found
  }
  return discord_id;
}
