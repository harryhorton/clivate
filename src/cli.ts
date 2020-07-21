import { readFileSync } from "fs";
import path from "path";
import { Config } from "./types";

export const getProjectConfigFile = async (configFilename: string) => {
  let data: string;
  try {
    data = readFileSync(path.resolve(process.cwd(), configFilename), "utf-8");
  } catch (e) {
    return null;
    // throw new Error(`${configFilename} not found at ${path.resolve(appRoot, configFilename)}`)
  }

  const config = JSON.parse(data);

  return config;
};

export const getProjectCommands = async (config: Config) => {
  const setup = require(path.resolve(process.cwd(), config.setupFile!));
  console.log(setup);
};
