# pistols-discord-bot

🔫[Pistols at 10 Blocks](https://pistols.lootunder.world/)

Add the Pistols Bot to your server: `later`

## Project structure

`/discord-bot`: The Bot

`/social-app`: App that links Duellists with their Discord account

## Developer Notes

* Please follow the [Setup instructions](/discord-bot/) before you start to collaborate
* It is recommended that every collaborator create their own bot and channel for testing
* We will send the test server invite link upon assignment

## Issue Dependency

```mermaid
graph TD;
  A[✅ #1 Bot Setup];
  C[✅ #3 Duelist Commands];
  B[✅ #2 Duel Commands];
  D[#4 Duel Notifications];
  E[✅ #5 Social Link App];
  F[#6 Discord Users Notifications];
  G[✅ #7 Discord Users Commands];
  H[#8 Issue / Accept Challenge];
  I[#9 Player Moves];
  J[✅ #14 New Duelists notification];
  K[#15 /my_turn command];
  L[#17 /settings command];

  A-->C;
  A-->B;
  C-->J;
  E-->F;
  J-->L;
  E-->G;
  B-->G;
  A-->H;
  E-->H;
  H-->I;
  G-->K;
  J-->F;
  J-->D;

```
