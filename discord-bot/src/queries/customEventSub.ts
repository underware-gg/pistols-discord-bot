import { sdk_ws } from "../config.js";
import { client } from "../index.js";
import { feltToString } from "../utils/misc.js";
import { EventKey } from "../utils/constants.js";
import * as ql from "../generated/graphql.js";

export const customEventSub = async (eventId: EventKey): Promise<boolean> => {
    try {
        await sdk_ws.customEventSub({ eventId }, (event: ql.World__Event) => {
            console.log(`+++++++ !!!!!`, event);

        });
        // await sdk_ws.customEventSub({ eventId }).then((response) => {
        //     console.log(`customEventSub() response:`, response);
        //     const eventData = parseCustomEventResponse(response.data)
        //     console.log(`customEventSub() eventData:`, eventData);
        // //     client.channels
        // //         .fetch(process.env.DISCORD_CHANNEL_ID || "")
        // //         .then((channel) => {
        // //             if (channel?.isTextBased()) {
        // //                 channel.send({
        // //                     embeds: [
        // //                         {
        // //                             color: 0x00ff3c,
        // //                             title: "Transactions",
        // //                             description: "new transactions",
        // //                             timestamp: new Date().toISOString(),
        // //                         },
        // //                     ],
        // //                 });
        // //             }
        // //         });
        // });
    } catch (error) {
        console.error("customEventSub() fetching error:", error);
        // throw error;
        console.error(`customEventSub(${eventId}) is ABORTING`);
        return false;
    }
    return true;
};

const parseCustomEventResponse = (data: ql.CustomEventSubSubscription): ql.World__Event[] => {
    let result: ql.World__Event[] = []
    // if (data?.eventEmitted?.edges) {
    //     result = data.challengeModels.edges.map((item: any) => {
    //         const challenge = item.node;
    //         return {
    //             ...challenge,
    //             message: feltToString(challenge.message), // strings in Cairo are encoded in a felt252, need to be convert
    //         }
    //     });
    // }
    return result
};
