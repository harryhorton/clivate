import inquirer from "inquirer";

export interface Config {
  setupFile: string;
  commandsDirectory?: string;
  commandsDistDirectory?: string;
}

export type FuncOrReturn<Func extends (...args: any[]) => any> =
  | Func
  | ReturnType<Func>;

export type NameInput = string;
export type DescriptionInput = string;
export type ArgsInput = string;
export type OptionsInput = [string, string?][];

export type PromptsInput =
  | inquirer.QuestionCollection<any>
  | ((inputs: {}) => inquirer.QuestionCollection<any> | false | undefined);

export type MessageInput =
  | string
  | ((inputs: {}) => string | false | undefined);
export type MessageBeforeHandlerInput =
  | string
  | ((inputs: {}) => string | false | undefined);
export type MessageAfterHandlerInput =
  | string
  | ((inputs: {}, returnValue?: any) => string | false | undefined);

type CommandOption = string;

export interface ICommand {
  name: string;
  description: string;
  args: string;
  options: [CommandOption, string?][];
  message: MessageInput;
  prompts: PromptsInput;
  messageBeforeHandler: MessageBeforeHandlerInput;
  messageAfterHandler: MessageAfterHandlerInput;
  handler(values?: {}): any;
}
export type ICommandOptions = Partial<ICommand>;
