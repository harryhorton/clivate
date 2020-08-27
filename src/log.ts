import chalk from "chalk";

export const LogWarning = () => {
  console.log(chalk.yellow({}));
};

export const LogError = () => {};

export class Log {
  static info(...args: any[]) {
    console.log(...args);
  }

  static warning(...args: any[]) {
    console.log(chalk.yellow(...args));
  }

  static error(...args: any[]) {
    console.log(chalk.red(...args));
  }
}
