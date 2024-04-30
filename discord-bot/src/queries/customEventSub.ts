import { getContractByName } from "@dojoengine/core";
import { dojoConfig } from "../dojoConfig.js";
import { sdk_ws } from "../config.js";
import { client } from "../index.js";
import { feltToString } from "../utils/misc.js";
import { EventKey } from "../utils/constants.js";
import * as ql from "../generated/graphql.js";

export const customEventSub = async (eventId: EventKey, eventName: string): Promise<boolean> => {
    try {
        await sdk_ws.customEventSub({ eventId }, (event: ql.World__Event) => {
            // console.log(`+++++++ !!!!!`, event);

            const { eventData } = parseCustomEventResponse(event, eventName);
            console.log(`+++++++ [${eventName}]:`, eventData);

            client.channels
                .fetch(process.env.DISCORD_CHANNEL_ID || "")
                .then((channel) => {
                    if (channel?.isTextBased()) {
                        channel.send({
                            embeds: [
                                {
                                    color: 0x00ff3c,
                                    title: eventData.name,
                                    description: "New Duelist!",
                                    timestamp: new Date().toISOString(),
                                },
                            ],
                        });
                    }
                });

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

const parseCustomEventResponse = (event: ql.World__Event, eventName: string): ql.World__Event & { eventData: any } => {
    const { keys, data } = event;
    const [eventId, contractAddress] = keys ?? [];
    const contract = getContractByName(dojoConfig().manifest, 'actions');
    // console.log(`CONTRACT,`, contract)
    const eventType = getEventTypeByName(contract.abi, eventName)
    // console.log(`eventType,`, eventType)
    const eventData = eventType.members.reduce((acc: any, t: any, index: number) => {
        const bi = BigInt(data?.[index] ?? 0);
        const d = nameEqualsTo(t.type, 'bool') ? Boolean(bi)
            : nameEqualsTo(t.type, 'felt252') ? feltToString(bi)
                : nameEqualsTo(t.type, ['u8', 'u16', 'u32', 'u64']) ? Number(bi)
                    : bi
        return {
            ...acc,
            [t.name]: d,
        }
    }, {} as any);
    // console.log(`eventData:`, eventData)
    const result = {
        ...event,
        eventData,
    }
    return result
};

export const getEventTypeByName = (abi: any, name: string) => {
    return abi.find((type: any) => {
        if (type.type != 'event') return false
        return nameEqualsTo(type.name, name);
    });
};

export const nameEqualsTo = (name: string, to: string | string[]) => {
    if (Array.isArray(to)) {
        for (const _to of to) {
            if (nameEqualsTo(name, _to)) return true
        }
        return false
    } else {
        const nameParts = name.split("::");
        return (name == to || nameParts[nameParts.length - 1] === to);
    }
};
