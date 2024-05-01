import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// usage:
// http://localhost:3000/api/fetch_id?discord_id=343964917034123265

export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { discord_id } = req.query;

    // console.log(`discord_id:`, discord_id, req.query);

    if (!discord_id) {
      return res.status(400).json({ message: "Bad Request: discord_id is required" });
    }

    const { data, error } = await supabase
      .from('pistols_accounts')
      .select('*')
      .eq('discord_id', discord_id);

    if (error) {
      console.error("Error fetching data:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "user not found, maybe not registered" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error("Error in processing request:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}