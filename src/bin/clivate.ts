import { InitCommand } from "../commands/init.command/init.command";
import { runProgram } from "../program-runner";
import {
  getPluginsCommands,
  getProjectCommands,
  getProjectConfigFile,
} from "../project-utils";

const run = async () => {
  const clivateConfigFile = "clivate.config.json";
  const config = await getProjectConfigFile(clivateConfigFile);
  
  const projectCommands = (await getProjectCommands(config)) ?? [];
  const pluginsCommands = (await getPluginsCommands(config)) ?? [];

  runProgram([InitCommand, ...projectCommands, ...pluginsCommands]);
};

run();
