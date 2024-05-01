import { createClient } from '@supabase/supabase-js';
import { bigintToHex } from '@/utils/misc';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// usage:
// http://localhost:3000/api/fetch_address?duelist_address=0x10071d15a0adc1b8e02d1a77d5fde334a5272a799adda2fc21c67041faa2151

export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { duelist_address } = req.query;

    // console.log(`duelist_address:`, duelist_address, req.query);

    if (!duelist_address) {
      return res.status(400).json({ message: "Bad Request: Duelist address is required" });
    }

    const { data, error } = await supabase
      .from('pistols_accounts')
      .select('*')
      .eq('duelist_address', bigintToHex(duelist_address));

    if (error) {
      console.error("Error fetching data:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error("Error in processing request:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}