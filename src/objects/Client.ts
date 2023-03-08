import { ApplicationCommand, ApplicationCommandDataResolvable, Client, ClientEvents, Collection, GatewayIntentBits } from 'discord.js';
import { promisify } from 'util';
import glob from 'glob';
import { CommandType } from '../types/Command';
import { Event } from './Event';

const PG = promisify(glob);

export class CBClient extends Client {
	commands: Collection<string, CommandType> = new Collection()
	constructor() {
		super({ intents: [GatewayIntentBits.Guilds] });
	}
	start() {
		this.loadModules()
		this.login(process.env.TOKEN);
	}
	async importFile(path) {
		return (await import(path))?.default;
	}
	async registerCommands(guildID, commands) {
		if (guildID) {
			this.guilds.cache.get(guildID)?.commands.set(commands);
			console.log(`Commands registered in ${guildID}`);
		} else {
			this.application?.commands.set(commands);
			console.log('Commands regirtered global');
		}
	}
	async loadModules() {
		// Events
		const eventFiles: string[] = await PG(`${__dirname}/../events/*/*{.js,.ts}`);
		eventFiles.forEach(async filePath => {
			const event: Event<keyof ClientEvents> = await this.importFile(filePath);
			if (event.once) {
				this.once(event.name, (...args) => event.execute(...args));
			} else {
				this.on(event.name, (...args) => event.execute(...args));
			}
		});


		// Commands
		const slashCommands: ApplicationCommandDataResolvable[] = [];
		const globalCommandFiles: string[] = await PG(`${__dirname}/../commands/global/*/*{.js,.ts}`);

		globalCommandFiles.forEach(async (filePath) => {
			const command: CommandType = await this.importFile(filePath);
			if (!command.name) return;
			this.commands.set(command.name, command);
			slashCommands.push(command);

		});
		this.registerCommands(process.env.DEV_GUILD_ID, slashCommands);
	}
}
