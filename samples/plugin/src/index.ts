import { SetupConfig } from "clivate";
import { PluginSampleCommand } from "./commands/plugin-sample.command";

export const setup = (): SetupConfig => {
  return { commands: [PluginSampleCommand] };
};
