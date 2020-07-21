import { Config } from "./types";

export const CONFIG_FILENAME = "clivate.config";

export const DEFAULT_CONFIG: Config = {
  setupFile: "./commands/dist/clivate.setup.js",
  commandsDirectory: "./commands",
  commandsDistDirectory: "./commands/build",
};
