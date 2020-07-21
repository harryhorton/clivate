import chalk from "chalk";
import * as path from "path";
import { createCommand } from "../../command-functions";
import { CONFIG_FILENAME } from "../../constants";
import { readFile, writeFile, writeTemplateFolder } from "../../templates";

export interface IInitCommandValues {
  createCommandsFolder: boolean;
  commandsFolderLocation?: string;
  containedWithinTsProject?: boolean;
  customDistFolder?: string;
}

export const InitCommand = createCommand({
  name: "init",
  description: "Initializes CLIvate in this project.",
  prompts: [
    {
      name: "createCommandsFolder",
      type: "confirm",
      message: `Generate a commands folder for custom project commands?`,
    },
    {
      name: "commandsFolderLocation",
      type: "input",
      message: `Provide a location for the custom commands folder`,
      when: ({ createCommandsFolder }) => createCommandsFolder,
      default: "./commands",
    },
    {
      name: "containedWithinTsProject",
      type: "confirm",
      message: `Is the commands folder contained within an existing TypeScript src folder?`,
      when: ({ createCommandsFolder, commandsFolderLocation }) =>
        createCommandsFolder && commandsFolderLocation !== "./commands",
      default: false,
    },
    {
      name: "customDistFolder",
      type: "input",
      message: `Specify the folder where the custom commands will be built (example: ./commands/build)`,
      when: ({ containedWithinTsProject }) => containedWithinTsProject,
      default: "./commands/build",
    },
  ],
  handler({
    createCommandsFolder = true,
    commandsFolderLocation = "./commands",
    containedWithinTsProject = false,
    customDistFolder = "./commands/build",
  }: any) {
    console.log(chalk.gray("Creating config file"));
    // create clivate.config.ts
    writeTemplateFolder({
      sourceFolder: path.resolve(__dirname, "../../../templates/init-config"),
      desintationFolder: process.cwd(),
      values: {
        configFilename: CONFIG_FILENAME,
        customDistFolder,
      },
    });

    // Create commands folder
    if (createCommandsFolder) {
      console.log(chalk.gray("Creating commands folder"));
      writeTemplateFolder({
        sourceFolder: path.resolve(
          __dirname,
          "../../../templates/commands-folder-src"
        ),
        desintationFolder: path.resolve(
          process.cwd(),
          commandsFolderLocation,
          containedWithinTsProject ? "" : "src"
        ),
        values: {},
      });
      // create tsc if not in project folder
      if (!containedWithinTsProject) {
        console.log(chalk.gray("Creating tsconfig file for commands folder"));
        writeTemplateFolder({
          sourceFolder: path.resolve(
            __dirname,
            "../../../templates/commands-folder-tsconfig"
          ),
          desintationFolder: path.resolve(process.cwd(), commandsFolderLocation),
          values: {},
        });

        const packagejson = readFile(path.resolve(process.cwd(), "package.json"));
        if (packagejson) {
          console.log(chalk.gray("Adding scripts to package.json"));

          const parsedPackage = JSON.parse(packagejson);

          parsedPackage.scripts[
            "build:commands"
          ] = `tsc --project ${commandsFolderLocation}/tsconfig.json`;

          writeFile(
            path.resolve(process.cwd(), "package.json"),
            JSON.stringify(parsedPackage, null, 2)
          );
        }
      }
      // change package.json to include run command.
    }
  },
});
