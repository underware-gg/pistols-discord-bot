import { createDojoConfig } from "@dojoengine/core";
import manifest from "./manifest.json" assert { type: "json" };
import * as dotenv from "dotenv";
dotenv.config();

export const dojoConfig = () => createDojoConfig({
  toriiUrl: process.env.TORII_URL,
  manifest,
});
