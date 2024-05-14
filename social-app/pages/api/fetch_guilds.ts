import { createSupabaseClient } from '@/utils/supabase';
import { bigintToHex } from '@/utils/misc';

const supabase = createSupabaseClient();

// usage:
// http://localhost:3000/api/fetch_guilds

export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {

    const { data, error } = await supabase
      .from('pistols_guilds')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Error fetching data:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Guilds not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in processing request:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}