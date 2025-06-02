# Pistols at Dawn | Discord bot

## Resources

* Using [Sapphire.js](https://www.sapphirejs.dev/docs/Guide/getting-started/getting-started-with-sapphire)
* Starter project: [with-typescript-starter](https://github.com/sapphiredev/examples/tree/main/examples/with-typescript-starter)
* Dojo.js example: [example-nodejs-bot](https://github.com/dojoengine/dojo.js/tree/cb208cab4d16a3066cd7320df709132385f5576a/examples/example-nodejs-bot)

## Setup

Add environment variables to `.env`:

```sh
# [pistols config]
# NETWORK_ID=SEPOLIA
NETWORK_ID=MAINNET

# [discord config]
DISCORD_TOKEN=<DISCORD_TOKEN>
APPLICATION_ID=<APPLICATION_ID>
CLIENT_URL=https://play.pistols.gg
```

Run the bot..

```sh
# install dependencies
pnpm i
# build...
pnpm build
# run the bot
pnpm start
# or in one line...
pnpm build && pnpm start
```
