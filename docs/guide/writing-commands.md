# Writing Commands

CLIvate makes writing new commands easier than using other CLI libraries directly. It combines terminal command arguments like `clivate custom-command --arg ./path` with optional interactive prompts to give your users a more delightful experience.

This page assumes that you've chosen the `init` option to add a commands folder to your project.


## Writing your first command
Create a new file for your sample command

```typescript
// <project-root>/commands/src/commands/sample.command.ts

// Chalk is recommended to give some color and life to your application.
import chalk from "chalk";
import { createCommand } from "clivate";

// Create your command
export const SampleCommand = createCommand({
  // The name of the command when called via terminal
  name: "sample",
  // description shows up on the help page
  description: "This is just a sample command.",
  // Write the logic
  handler() {
    console.log(chalk.green("It Works!"));
  },
}); 
```

Import and register your command in the `setup.ts` file
```typescript
// <project-root>/commands/src/setup.ts
import { SampleCommand } from "./commands/sample.command";

export const setup = {
    commands: [SampleCommand],
  };
```

Build your commands. This will compile your TypeScript to JavaScript.
```sh
yarn build:commands
```

Run clivate to see that it shows up on the help page, and then run your command to see it work.
```sh
clivate
# or if installed in your project
yarn clivate

clivate sample
# outputs It works! in green.
```

