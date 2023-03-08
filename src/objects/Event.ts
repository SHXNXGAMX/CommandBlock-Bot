import { ClientEvents } from "discord.js";

export class Event<Key extends keyof ClientEvents> {
	constructor(
		public name: Key,
		public once: boolean,
		public execute: (...args: ClientEvents[Key]) => any
	) {
		this.name = name;
		this.execute = execute;
	}
}