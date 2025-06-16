# Pistols at Dawm Discord Bot

A Discord social bot for [Pistols at Dawm](https://pistols.gg) Dojo game.


### Environemnt variables

Copy `.env.example` to `.env` and edit it.

```
# [pistols config]
# NETWORK_ID=SEPOLIA
NETWORK_ID=MAINNET

# [discord config]
DISCORD_TOKEN=<DISCORD_TOKEN>
APPLICATION_ID=<APPLICATION_ID>
```

### Install dependencies

```bash
pnpm install
```

### Build and run...

```bash
pnpm run build
pnpm run start
```


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
4. Build is [configured](https://nixpacks.com/docs/configuration/file) by `nixpacks.toml`

OHAYO
