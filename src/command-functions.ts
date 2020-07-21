import {
  NameInput,
  DescriptionInput,
  ArgsInput,
  OptionsInput,
  PromptsInput,
  MessageInput,
  MessageBeforeHandlerInput,
  MessageAfterHandlerInput,
  ICommand,
  ICommandOptions,
} from "./types";

export const CommandDefaultProperties: ICommand = {
  name: "no name",
  description: "no description",
  args: "",
  options: [],
  message: '',
  messageAfterHandler: '',
  messageBeforeHandler: '',
  prompts: [],
  handler(values?: {}) {
    console.log(this.name, "has no handler", values);
  },
};

export const createCommand = (options: ICommandOptions = {}): ICommand => ({
  ...CommandDefaultProperties,
  ...options,
});
export const addName = (name: NameInput) => (command: ICommand): ICommand => ({
  ...command,
  name,
});
export const addDescription = (description: DescriptionInput) => (
  command: ICommand
): ICommand => ({
  ...command,
  description,
});

export const addArgs = (args: ArgsInput) => (command: ICommand): ICommand => ({
  ...command,
  args,
});
export const addOptions = (options: OptionsInput) => (
  command: ICommand
): ICommand => ({
  ...command,
  options,
});

export const addPrompts = (prompts: PromptsInput) => (
  command: ICommand
): ICommand => ({
  ...command,
  prompts,
});

export const addMessage = (message: MessageInput) => (
  command: ICommand
): ICommand => ({
  ...command,
  message,
});

export const addMessageBeforeHandler = (
  messageBeforeHandler: MessageBeforeHandlerInput
) => (command: ICommand): ICommand => ({
  ...command,
  messageBeforeHandler,
});

export const addMessageAfterHandler = (
  messageAfterHandler: MessageAfterHandlerInput
) => (command: ICommand): ICommand => ({
  ...command,
  messageAfterHandler,
});

export const addHandler = (handler: (inputs: {}) => any) => (
  command: ICommand
): ICommand => ({
  ...command,
  handler,
});
