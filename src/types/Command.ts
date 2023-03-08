import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, PermissionResolvable } from "discord.js";
import { CBClient } from "../objects/Client";


interface CommandOptions {
	client?: CBClient;
	interaction: CommandInteraction;
	args: CommandInteractionOptionResolver;
}

type ExecuteFunction = (options: CommandOptions) => any;

export type CommandType = {
	userPermissions?: PermissionResolvable[];
	cooldown?: number;
	execute: ExecuteFunction;
} & ChatInputApplicationCommandData