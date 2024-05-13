# Pistols at 10 Blocks Discord Bot

A Discord social bot for [Pistols at 10 Blocks)[https://pistols.lootunder.world/] Dojo game.

Based on: [dojo.js/examples/node/torii-bot](https://github.com/dojoengine/dojo.js/tree/main/examples/node/torii-bot)

## About Torii GraphQL Models

Torii exposes dynamically generated models based on your world's models. We can use this to generate a GraphQL SDK for easy querying of the world.

You can access the GraphQL dashboard by navigating to [https://api.cartridge.gg/x/pistols/torii/graphql](https://api.cartridge.gg/x/pistols/torii/graphql) or [http://0.0.0.0:8080/graphql](http://0.0.0.0:8080/graphql) if your Torii is running locally.


## Development Setup

It is recommended that each developer create their own bot on Discord for testing.

Give it wour name so we can identify each one, like: `pistols-bot-joe`

Contact us to get the test server invite and roles.

> Follow the steps [below](#create-discord-bot-step-by-step) to obtain your Discord Token and Application ID. You will also need to acquire your Discord channel ID where you want to send messages. You can obtain this by right-clicking on a channel in your Discord and selecting 'Copy Channel ID'.

### Environemnt variables

Copy `.env.example` to `.env` and edit it. Replace the tokens for your own on `.env`.

```
DISCORD_TOKEN=<DISCORD_TOKEN>
DISCORD_CHANNEL_ID=<DISCORD_CHANNEL>
APPLICATION_ID=<APPLICATION_ID>
DISCORD_CHANNEL_ID=1233121691354267749
TORII_URL=https://api.cartridge.gg/x/pistols/torii
CLIENT_URL=https://pistols.lootunder.world
SOCIAL_APP_URL=https://pistols-social-app.vercel.app
```

### Install dependencies

```bash
pnpminstall
```

### Codegen

For every new or updated query in `src/graphql/`, you need to run...

```bash
pnpmrun codegen
```

Now you can access the sdk in your app like:

```js
import { sdk } from "../config.js";

const { data } = await sdk.getChallenges({ state });
```

### Terminal 1 - Serve the Bot

```bash
pnpmrun serve
```

### Terminal 2 - Build and Watch

```bash
pnpmrun build --watch
```

Now, try running it on your server. Remember to restart your bot after making changes.


## Create discord bot step by step

Following is a generic guide for development and deployment of a Discord bot. It is not necessary for servers that want to use add the bot, only for contributing developers.

### Discord Bot Setup

* Step 1: Go to [Discord Developers](https://discord.com/developers/applications) and create a new application.
![Step 1](./images/Step%201.png)

* Step 2: Name the application.
![Step 2](./images/Step%202.png)

* Step 3: Select the 'Bot' sidebar item and reset and save the Auth token. Store it in a .env file within your application. Do not share or commit this token. Ensure its confidentiality.
![Step 3](./images/Step%203.png)

* Step 4: Enable the switches as shown in the image below. Your app will not function properly without doing this.
![Step 4](./images/Step%204.png)

* Step 5: Choose the 'OAuth2' sidebar item and make the selections as shown. Opt for additional choices if you understand their implications.
![Step 5](./images/Step%205.png)

* Step 6: Determine the permissions for the bot. As our goal is only to send messages, that's what we'll select.
![Step 6](./images/Step%206.png)

* Step 7: Navigate to the URL generated in the previous step and add the bot to your server.
![Step 7](./images/Step%207.png)

### Deploying

Deploying these apps onto [Railway](https://railway.app/) is the easiest.

1. Create Account
2. Create a new project and deploy via git
3. In your project settings

Update the project settings:

**Build Command:**
`pnpmrun build`

**Start Command:**
`pnpmrun serve`

OHAYO
