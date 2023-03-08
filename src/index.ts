require('dotenv').config();
import { CBClient } from "./objects/Client";

export const client = new CBClient();

client.start();