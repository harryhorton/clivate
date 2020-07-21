import { Command as CommanderCommand } from "commander";
import { pipe } from "rambda";
import { runCommand } from "./run-command";
import { ICommand } from "./types";

interface PipeContext {
  commanderCommand: CommanderCommand;
  command: ICommand;
}

const generateOptions = ({ command, commanderCommand }: PipeContext) => {
  command.options.forEach((option) => {
    commanderCommand = commanderCommand.option(...option);
  });

  return { command, commanderCommand };
};

const generateDescription = ({ command, commanderCommand }: PipeContext) => {
  commanderCommand = commanderCommand.arguments(command.args);

  return { command, commanderCommand };
};

const generateArguments = ({ command, commanderCommand }: PipeContext) => {
  commanderCommand = commanderCommand.description(command.description);

  return { command, commanderCommand };
};

/**
 * Accepts arguments from commander action.
 * The parameters shift, so this ensures that we
 * always get the command object
 */
const getCommandObject = ([arg1, arg2]: any[]) => arg2 ?? arg1;

const extractValuesFromArguments = (commandObject: any) =>
  (commandObject._args ?? []).reduce(
    (accum: any, current: any, index: number) => {
      accum[current.name] = commandObject.args[index];
      return accum;
    },
    {}
  );

const extractValuesFromOptions = (commandObject: any) =>
  (commandObject.options ?? []).reduce((accum: any, current: any) => {
    // get the long or short name and remove `-'s`. Have to do this to get the name...
    const name =
      current.long?.replace("--", "") ?? current.short?.replace("-", "");
    if (!name) return accum;

    if (commandObject[name] ?? false) {
      accum[name] = commandObject[name];
    }
    return accum;
  }, {});

const generateAction = ({ command, commanderCommand }: PipeContext) => {
  commanderCommand = commanderCommand.action(async (...args) => {
    const commandObject = getCommandObject(args);

    const commanderValues: {} = {
      ...extractValuesFromArguments(commandObject),
      ...extractValuesFromOptions(commandObject),
    };

    await runCommand(command, commanderValues);
  });
  return { command, commanderCommand };
};

/**
 * Generates a `commander` command from a CLIvate command class
 */
export const commandGenerator = (
  command: ICommand
) => {
  const initialCommanderCommand = new CommanderCommand(
    command.name
  ) as CommanderCommand;

  const { commanderCommand } = pipe(
    generateOptions,
    generateDescription,
    generateArguments,
    generateAction
  )({ commanderCommand: initialCommanderCommand, command });

  return commanderCommand;
};
