import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
    );

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { discord_id, duelist } = req.body;

        // Input validation (optional): You can add checks here to ensure data meets your requirements

        const { data, error } = await supabase.from("pistols_accounts").upsert([
            {
                discord_id: discord_id,
                duelist_address: duelist,
                created_at: new Date().toISOString(),
            },
        ]);

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

