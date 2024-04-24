import { sdk } from "../config";
import { client } from "..";
// import { client } from "./discordClient";

export const getTransations = async () => {
    try {
        await sdk.getTransations().then((data) => {
            console.log(data);
            client.channels
                .fetch(process.env.DISCORD_CHANNEL_ID || "")
                .then((channel: any) => {
                    if (channel?.isTextBased()) {
                        channel.send({
                            embeds: [
                                {
                                    color: 0x00ff3c,
                                    title: "Transactions",
                                    description: "new transactions",
                                    timestamp: new Date().toISOString(),
                                },
                            ],
                        });
                    }
                });
        });
    } catch (error) {
        console.error("Fetching error:", error);
        throw error;
    }
};

export const getChallenges = async (state: string) => {
    try {
        // const playerId = "your-player-id";
        const { data } = await sdk.getChallenges({ state });

        return data;
    } catch (error) {
        console.error("Fetching error:", error);
        throw error;
    }
};
