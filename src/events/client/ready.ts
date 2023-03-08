import { ActivityType, Events } from "discord.js";
import { Event } from "../../objects/Event";

export default new Event(Events.ClientReady, true, (client) => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
	client.user.setPresence({ activities: [{ name: 'за проводками', type: ActivityType.Watching }], status: 'idle' });
})