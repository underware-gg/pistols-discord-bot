import { BaseMessageOptions } from "discord.js";
import { getContractByName } from "@dojoengine/core";
import { dojoConfig } from "../dojoConfig.js";
import { getDuelistByAddress, DuelistResponse } from "./getDuelists.js";
import { feltToString } from "../utils/misc.js";
import { EventName, EventKeys } from "../utils/constants.js";
import { formatDuelistPayload } from "../utils/duelists.js";
import { sdk_ws } from "../config.js";
import { client } from "../index.js";
import * as ql from "../generated/graphql.js";

export const customEventSub = async (eventName: EventName): Promise<boolean> => {
  const eventId = EventKeys[eventName];
  try {
    await sdk_ws.customEventSub({ eventId }, async (event: ql.World__Event) => {
      // console.log(`+++++++ !!!!!`, event);

      const { eventData } = parseCustomEventResponse(event, eventName);
      console.log(`+++++++ [${eventName}]:`, eventData);

      let payload: BaseMessageOptions | undefined;
      if (eventName == EventName.DuelistRegistered) {
        const duelist: DuelistResponse | null = await getDuelistByAddress(eventData.address);
        // console.log(`+++++++ Duelist:`, duelist);
        if (duelist) {
          payload = await formatDuelistPayload({
            duelist,
            title: eventData.is_new ? 'New Duelist!' : 'Updated Duelist',
            full: false,
          })
        }
      }

      if (payload) {
        client.channels.fetch(process.env.DISCORD_CHANNEL_ID || "").then((channel) => {
          if (channel?.isTextBased()) {
            channel.send(payload);
          }
        }
        );
      }

    });
  } catch (error) {
    console.error(`customEventSub(${eventName}) fetching error:`, error);
    console.error(`customEventSub(${eventName}) is ABORTING`);
    // throw error;
    return false;
  }
  return true;
}

const parseCustomEventResponse = (event: ql.World__Event, eventName: string): ql.World__Event & { eventData: any } => {
  const { keys, data } = event;
  const [eventId, contractAddress] = keys ?? [];
  const contract = getContractByName(dojoConfig().manifest, 'actions');
  // console.log(`CONTRACT,`, contract)
  const eventType = getEventTypeByName(contract.abi, eventName)
  // console.log(`eventType,`, eventType)
  const eventData = eventType.members.reduce((acc: any, t: any, index: number) => {
    const bi = BigInt(data?.[index] ?? 0);
    const value = nameEqualsTo(t.type, 'bool') ? Boolean(bi)
      : nameEqualsTo(t.type, 'felt252') ? feltToString(bi)
        : nameEqualsTo(t.type, ['u8', 'u16', 'u32', 'u64']) ? Number(bi)
          : bi
    return {
      ...acc,
      [t.name]: value,
    }
  }, {} as any);
  // console.log(`eventData:`, eventData)
  const result = {
    ...event,
    eventData,
  }
  return result
}

export const getEventTypeByName = (abi: any, name: string) => {
  return abi.find((type: any) => {
    if (type.type != 'event') return false
    return nameEqualsTo(type.name, name);
  });
}

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
}
