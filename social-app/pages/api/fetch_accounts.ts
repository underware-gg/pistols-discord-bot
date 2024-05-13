import { createClient } from '@supabase/supabase-js';
import { bigintToHex } from '@/utils/misc';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// usage:
// http://localhost:3000/api/fetch_accounts

export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { data, error } = await supabase
      .from('pistols_accounts')
      .select('discord_id,duelist_address')
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Error fetching data:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in processing request:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}