import { Command } from "@sapphire/framework";
export declare class Moves extends Command {
    constructor(context: Command.Context, options: Command.Options);
    registerApplicationCommands(registry: Command.Registry): void;
    chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<any>;
}
