declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			CLIENT_ID: string;
			OWNER_ID: string;
			DEV_GUILD_ID: string;

			MYSQL_HOST: string;
			MYSQL_PORT: string;
			MYSQL_USER: string;
			MYSQL_PASSWORD: string;
			MYSQL_DATABASE: string;
		}
	}
}
export {};