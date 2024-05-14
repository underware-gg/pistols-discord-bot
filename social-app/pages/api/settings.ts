import { removeEmpty } from '@/utils/misc';
import { createSupabaseClient } from '@/utils/supabase';

const supabase = createSupabaseClient();

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const {
      user_id,
      guild_id,
      notifications_channel_id,
      challenges_notifications,
      new_duelist_notifications,
      duelists_turn_notifications,
    } = req.body;
    // console.log(`settings [${guild_id}]:`, req.body);

    // Input validation (optional): You can add checks here to ensure data meets your requirements

    if (!guild_id) {
      return res.status(400).json({ message: "Bad Request: Guild Id is required" });
    }

    //
    // Exists?
    const _get_current = async () => {
      const { data, error } = await supabase
        .from('pistols_guilds')
        .select('*')
        .eq('guild_id', guild_id);
      if (!data || data.length === 0) {
        // channel is required!
        if (!notifications_channel_id) {
          return res.status(400).json({ message: "Bad Request: Channel Id is required" });
        }
      }
      return data[0];
    }

    let current_values = await _get_current();

    let fields = {
      ...current_values,
      ...removeEmpty({
        guild_id,
        notifications_channel_id,
        challenges_notifications,
        new_duelist_notifications,
        duelists_turn_notifications,
      })
    };
    // console.log(`FIELDS`, fields)

    const { data, error } = await supabase
      .from("pistols_guilds")
      .upsert([fields]);

    if (error) {
      console.error("Error saving data:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    console.log("Settings saved successfully!");
    return res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

