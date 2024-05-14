import { createSupabaseClient } from '@/utils/supabase';
import { bigintToHex } from '@/utils/misc';

const supabase = createSupabaseClient();

// usage:
// http://localhost:3000/api/fetch_guild?guild_id=1232006088765739049

export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { guild_id } = req.query;

    // console.log(`duelist_address:`, duelist_address, req.query);

    if (!guild_id) {
      return res.status(400).json({ message: "Bad Request: Guild Id is required" });
    }

    const { data, error } = await supabase
      .from('pistols_guilds')
      .select('*')
      .eq('guild_id', guild_id);

    if (error) {
      console.error("Error fetching data:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Guild not found" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error("Error in processing request:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}