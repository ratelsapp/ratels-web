import { HttpAgent } from "@dfinity/agent";
import { host } from "constants/server";

export const httpAgent = (options) => new HttpAgent({ ...{ host }, ...options });
