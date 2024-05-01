import { createClient } from 'graphql-ws';
import { DocumentNode, print } from 'graphql';
import { CustomEventSubDocument, CustomEventSubSubscriptionVariables, World__Event } from "./generated/graphql.js";
import WebSocket from "ws";


// graphql-ws
// https://the-guild.dev/graphql/ws/get-started

export const getSdkWs = (url: string) => {
  const client = createClient({
    url,
    webSocketImpl: WebSocket,
  });

  const subscribe = async (doc: DocumentNode, variables: any, onEvent: (event: World__Event) => void) => {
    const query = print(doc);
    // console.log(`+++ sub()`, query, variables)
    const subscription = client.iterate({
      query,
      variables,
    });

    for await (const event of subscription) {
      // console.log(event);
      onEvent(event?.data?.eventEmitted as World__Event ?? null)
      // complete a running subscription by breaking the iterator loop
      // break;
    }
  }

  return {
    customEventSub(variables: CustomEventSubSubscriptionVariables, onEvent: (event: World__Event) => void): Promise<void> {
      return subscribe(CustomEventSubDocument, variables, onEvent);
    },
  }
}
export type SdkWs = ReturnType<typeof getSdkWs>;
