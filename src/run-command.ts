import { FuncOrReturn, ICommand, PromptsInput } from "./types";
import inquirer from "inquirer";

/**
 * Prompts user for missing values using Inquirer
 */
const generateInquirerPrompts = async (command: ICommand, values: {}) => {
  //@ts-ignore
  let prompts: PromptsInput =
    typeof command.prompts === "function"
      ? await command.prompts(values)
      : command.prompts;

  if (!prompts || (Array.isArray(prompts) && !prompts.length)) {
    return false;
  }

  //@ts-ignore
  return prompts.filter((prompt) => {
    return typeof values[prompt.name] === "undefined";
  });
};

const logCommandMessage = async <
  Input extends FuncOrReturn<(...args: any[]) => any>
>(
  message: Input,
  values: {},
  returnValues?: any
) => {
  if (!message) return;

  if (typeof message === "function") {
    return console.log(await message(values, returnValues));
  }

  console.log(message);
};

export const runCommand = async (command: ICommand, commanderValues: {}) => {
  const prompts = await generateInquirerPrompts(command, commanderValues);

  await logCommandMessage(command.message, commanderValues);

  const inquirerValues: {} = prompts ? await inquirer.prompt(prompts) : {};

  const values = { ...commanderValues, ...inquirerValues };

  await logCommandMessage(command.messageBeforeHandler, commanderValues);

  const result = await command.handler(values);

  await logCommandMessage(command.messageAfterHandler, commanderValues, result);

  return result;
};
