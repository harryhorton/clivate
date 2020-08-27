import { readFileSync } from "fs";
import path from "path";
import { Config, SetupFileExport } from "./types";

export class ConfigFileNotFoundError extends Error {}
export class ConfigFileNotValidJsonError extends Error {}

export const getProjectConfigFile = async (configFilename: string) => {
  let data: string;
  const configPath = path.resolve(process.cwd(), configFilename);

  try {
    data = readFileSync(configPath, "utf-8");
  } catch (e) {
    throw new ConfigFileNotFoundError(
      `Config file not found at ${configPath}. Try running init.`
    );
  }

  let config: Config;

  try {
    config = JSON.parse(data);
  } catch (e) {
    throw new ConfigFileNotValidJsonError(
      `Config file at ${configPath} is not valid JSON`
    );
  }

  return config;
};

export class ConfigMustIncludeCommandsDistDirectory extends Error {}
export class SetupFileMustExportSetup extends Error {}

export const getProjectSetupFile = (config: Config): SetupFileExport | null => {
  if (!config.commandsDistDirectory) {
    throw new ConfigMustIncludeCommandsDistDirectory(
      `Config must contain a commandsDistDirectory key.`
    );
  }

  const setupFilePath = path.resolve(
    process.cwd(),
    config.commandsDistDirectory,
    "setup.js"
  );

  let setupFile: SetupFileExport;
  try {
    setupFile = require(setupFilePath);
  } catch {
    return null;
  }

  return setupFile;
};

export const runSetupFile = async ({ setup }: SetupFileExport) => {
  if (typeof setup === "object") return setup;
  if (typeof setup === "function") return await setup();

  throw new SetupFileMustExportSetup(
    `setup file must have named export "setup" as a function or object`
  );
};

export const getProjectCommands = async (config: Config) => {
  try {
    const setupFile = getProjectSetupFile(config);
    if (setupFile) {
      const { commands } = await runSetupFile(setupFile);
      return commands || [];
    }
  } catch (e) {}
  return [];
};

export const getPluginsCommands = async (config: Config) => {
  if (!Array.isArray(config.plugins)) return [];

  const commandLists = await Promise.all(
    config.plugins.map(async (packageName) => {
      const pluginPath = require.resolve(packageName, {
        paths: [process.cwd()],
      });
      const setupFile: SetupFileExport = require(pluginPath);

      return (await runSetupFile(setupFile)).commands || [];
    })
  );

  return commandLists.reduce((prev, curr) => prev.concat(curr), []);
};
