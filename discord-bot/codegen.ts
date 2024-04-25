import type { CodegenConfig } from "@graphql-codegen/cli";
// const { TORII_Url } = require("dotenv").config();
const config: CodegenConfig = {
  schema: "https://api.cartridge.gg/x/pistols/torii/graphql",
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        rawRequest: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: [
      `sed -i '' "s/import { GraphQLClientRequestHeaders } from 'graphql-request\\/build\\/cjs\\/types';/export type GraphQLClientRequestHeaders = Headers | string\\[\\]\\[\\] | Record<string, string>/" ./src/generated/graphql.ts`,
    ],
  },
};
export default config;
