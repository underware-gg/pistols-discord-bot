
# PISTOLS SOCIAL APP

Simple to link your Discord user to your [Pistols at 10 Blocks](https://pistols.lootunder.world/) duelist


## Development Setup

It is recommended that each developer create their own bot on Discord for testing.

Give it wour name so we can identify each one, like: `pistols-bot-joe`

Contact us to get the test server invite and roles.

> Follow the steps [below](#setup-discord-app) to setup your Discord app...


### Environment variables

Copy `.env.example` to `.env` and edit it. Replace the tokens for your own on `.env`.

```
# App
JWT_SECRET=thisisasecret
# Discord
DISCORD_CLIENT_SECRET=<AUTH2_SECRET>
NEXT_PUBLIC_DISCORD_CLIENT_ID=<OAUTH2_CLIENT_ID>
NEXT_PUBLIC_DISCORD_REDIRECT_URL=http://localhost:3000/api/oauth
NEXT_PUBLIC_DISCORD_ADD_BOT_URL=<URL_FROM_STEP_6>
# Supabase
SUPABASE_SERVICE_KEY=<SUPABASE_API_KEY>
NEXT_PUBLIC_SUPABASE_URL=<SUPABASE_URL>
# Pistols
NEXT_PUBLIC_TORII_URL=https://api.cartridge.gg/x/pistols/torii
NEXT_PUBLIC_CLIENT_URL=https://pistols.lootunder.world
```

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Setup Discord App

> Follow the steps on [discord-bot](/discord-bot/README.md#create-discord-bot-step-by-step) to create and setup your bot app.

* Step 8: Go to your ap `OAuth2` page and get your `NEXT_PUBLIC_DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET`.
![Step 8 ](./images/Step%208.png)

* Step 6: Copy the URL from Step 6 to `NEXT_PUBLIC_DISCORD_ADD_BOT_URL`.
