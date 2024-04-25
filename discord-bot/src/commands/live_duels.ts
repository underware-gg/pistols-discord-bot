import { Command } from "@sapphire/framework";
import { getChallenges } from "../queries/getChallenges.js";
import { ChallengeState } from "../constants.js";

//
// Slash command
//
// saffire command reference:
// https://www.sapphirejs.dev/docs/Guide/getting-started/creating-a-basic-app-command
// https://github.com/sapphiredev/examples/blob/main/examples/with-typescript-starter/src/commands/ping.ts
//
// discord command builder reference:
// https://discordjs.guide/slash-commands/advanced-creation.html
//

export class LiveDuelsCommand extends Command {
    public constructor(context: Command.LoaderContext, options?: Command.Options) {
        super(context, {
            ...options,
            description: "List Live Duels",
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) => builder
            .setName(this.name)
            .setDescription(this.description)
            // .addStringOption((builder) => builder
            //     .setName("address")
            //     .setDescription("Duelist Address")
            //     .setRequired(true)
            // )
        );
    }

    public override async chatInputRun(
        interaction: Command.ChatInputCommandInteraction
    ) {
        // const address = interaction.options.getString("address");

        const state = ChallengeState.InProgress;

        await interaction.deferReply();

        const challenges = await getChallenges(state);

        if (challenges) {
            const content = challenges.reduce((result: string, challenge: any, index: number) => {
                return result + `duel \`${index + 1}\` id: \`${challenge.duel_id}\`\n`;
            }, '');
            return interaction.editReply({
                content,
            });
        } else {
            return interaction.editReply({
                content: "No duels found!",
            });
        }
    }
}
