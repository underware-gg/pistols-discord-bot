# Pistols at Dawn | Discord bot

## Resources

* Dojo bot based on: [dojo.js/examples/example-node-worker](https://github.com/dojoengine/dojo.js/tree/cb208cab4d16a3066cd7320df709132385f5576a/examples/example-node-worker)

## Setup

Add environment variables to `.env`:

```sh
# [pistols config]
# NETWORK_ID=SEPOLIA
NETWORK_ID=MAINNET

DISCORD_TOKEN=<DISCORD_TOKEN>
APPLICATION_ID=<APPLICATION_ID>
CLIENT_URL=https://play.pistols.gg
```

Run the bot..

```sh
# install dependencies
pnpm i

# build and run the bot
pnpm build
pnpm start
# or...
bun ./dist/main.js

# or in one line...
pnpm build && bun ./dist/main.js
```
