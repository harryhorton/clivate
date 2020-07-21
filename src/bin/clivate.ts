import { InitCommand } from "../commands/init.command/init.command";
import { runProgram } from "../program-runner";
import { getProjectConfigFile } from "../cli";
import path from "path";
import chalk from "chalk";

const run = async (): Promise<any> => {
  const config: any = await getProjectConfigFile("clivate.config.json");

  if (!config) {
    console.log(
      chalk.red("Config file not found. Please run clivate init first")
    );
    runProgram([InitCommand]);
  } else {
    const { setup } = require(path.resolve(
      process.cwd(),
      config.commandsDistDirectory,
      "setup.js"
    ));
    const { commands } = await setup();
    runProgram([InitCommand, ...commands]);
  }
};

run();
