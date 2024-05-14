import { createSupabaseClient } from '@/utils/supabase';
import { bigintToHex } from '@/utils/misc';

const supabase = createSupabaseClient();

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { discord_id, discord_name, duelist_address } = req.body;
    // console.log(`upsert:`, discord_id, `[${duelist_address}]`, typeof duelist_address);

    // Input validation (optional): You can add checks here to ensure data meets your requirements

    const fields = {
      discord_id,
      discord_name,
      duelist_address: duelist_address ? bigintToHex(duelist_address) : null,
    };

    const { data, error } = await supabase
      .from("pistols_accounts")
      .upsert([fields]);

    if (error) {
      console.error("Error saving data:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    console.log("Wallet address saved successfully!");
    return res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

