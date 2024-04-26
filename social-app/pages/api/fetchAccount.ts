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
        const { id } = req.body;
        const { data, error } = await supabase
            .from('pistols_accounts')
            .select('*') // Select all columns
            .in('discord_id, duelist_address', [id]); // Check if id matches either discord_id or duelist_address

        if (error) {
            console.error("Error fetching data:", error.message);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Account not found" });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}