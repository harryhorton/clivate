import chalk from "chalk";
import { createCommand } from "clivate";

export const SampleCommand = createCommand({
  name: "sample",
  description: "This is just a sample command.",
  handler() {
    console.log(chalk.green("Doing the thing"));
  },
});
