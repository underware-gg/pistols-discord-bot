# pistols-discord-bot
A Discord bot for Pistols at 10 Blocks

## Project structure

`/discord-bot`: The Discord bot

* Cloned from [dojo.js/examples/node/torii-bot](https://github.com/dojoengine/dojo.js/tree/main/examples/node/torii-bot)
* [Setup instructions](/discord-bot/)


## Issue Dependency

```mermaid
graph TD;
  A[#1 Bot Setup];
  B[#2 Duel Commands];
  C[#3 Duelist Commands];
  D[#4 Duel Notifications];
  E[#5 Social Link App];
  F[#6 Users Commands];
  G[#7 User Notifications];
  H[#8 Issue / Accept Challenge];
  I[#9 Player Moves];

  A-->B;
  A-->C;
  B-->D;
  D-->F;
  E-->F;
  B-->G;
  E-->G;
  A-->H;
  E-->H;
  H-->I;

```
