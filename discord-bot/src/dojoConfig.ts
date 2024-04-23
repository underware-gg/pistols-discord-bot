import manifest from "./manifest.json" assert { type: "json" };

import { createDojoConfig } from "@dojoengine/core";

export const dojoConfig = () =>  createDojoConfig({
    toriiUrl: process.env.TORII_URL,
    manifest,
});
