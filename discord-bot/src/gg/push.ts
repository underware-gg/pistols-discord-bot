import { env } from "../env.js";

export type PushActionsPayload = {
  actions: string[];
  address: string;
};

export async function pushActions({ actions, address }: PushActionsPayload) {
  console.log("+++ push:", address, actions);
  const url = `${env.API_URL}/api/v2/action-dispatcher/dispatch/public`;
  const body = JSON.stringify({ actions, playerAddress: address });
  return fetch(url, {
    method: "POST",
    body,
    headers: {
      secret: env.GAME_SECRET,
      "Content-Type": "application/json",
    },
  });
}
