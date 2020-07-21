import { program } from "commander";
import { commandGenerator } from "./command-generator";
import { ICommand } from "./types";

const generateProgram = (commands: ICommand[]) => {
  const commanderCommands = commands.map((command) =>
    commandGenerator(command)
  );

  // register commands with commander
  commanderCommands.forEach((command) => program.addCommand(command));

  return program;
};

export const runProgram = (commands: ICommand[], argv: any = process.argv) => {
  const program = generateProgram(commands);

  return program.parseAsync(argv);
};

export const runTestProgram = (commands: ICommand[], command: string) => {
  const program = generateProgram(commands);

  return program.exitOverride().parseAsync(["_", "_", command]);
};
