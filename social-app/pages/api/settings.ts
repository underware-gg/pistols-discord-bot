import { removeEmpty } from '@/utils/misc';
import { JwtPayload, verify } from "jsonwebtoken";
import { createSupabaseClient } from '@/utils/supabase';

const supabase = createSupabaseClient();

const JWT_SECRET = process.env.JWT_SECRET || 'thisisasecret';

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

    // TODO: Verify if user is admin of guild?
    // maybe it's not necessary, sice we already validated that the message came from the bot
    const decoded_user_id = verify(user_id, JWT_SECRET) as JwtPayload;
    if (!decoded_user_id || !decoded_user_id.user_id) {
      console.error("Bad Request: Unable to verify user");
      return res.status(400).json({ message: "Bad Request: Unable to verify user" });
    }

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

