import { readdirSync } from "fs";
//@ts-ignore
import mockfs from "mock-fs";
import path from "path";
import { runCommand } from "../../run-command";
import { IInitCommandValues, InitCommand } from "./init.command";
import { getAllFiles } from "../..";

const mockload = (filepath: string) =>
  // @ts-ignore
  mockfs.load(path.resolve(__dirname, filepath), {
    recursive: true,
    lazy: true,
  });

const TEMPLATES_DIR = path.resolve(__dirname, "../../../templates");
const PROJECT_ROOT = "/project";
const NODE_MODULES = path.resolve(__dirname, '../../../node_modules')
describe("Command: init", () => {
  beforeEach(() => {
    mockfs({
      [PROJECT_ROOT]: {
        "package.json": JSON.stringify({
          scripts: {},
        }),
        src: {
          "index.ts": `export const thing = 'thing';`,
        },
      },
      [TEMPLATES_DIR]: mockload(TEMPLATES_DIR),
      [NODE_MODULES]:mockload(NODE_MODULES)
    });
    // set the project root
    process.chdir(PROJECT_ROOT);
  });
  // TODO wait for https://github.com/tschaub/mock-fs/pull/304/files
  // need to "load" real templates into memory.
  // mockfs.

  afterEach(() => {
    mockfs.restore();
  });

  it("should create config file", async () => {
    await runCommand(InitCommand, {
      createCommandsFolder: false,
    } as IInitCommandValues);

    const content = require(path.resolve(PROJECT_ROOT, "clivate.config.json"));

    expect(content).toMatchObject({
      commandsDirectory: "./commands",
      commandsDistDirectory: "./commands/build",
      setupFile: "./clivate.setup.js",
    });
  });

  it("should not create commands folder if no", async () => {
    await runCommand(InitCommand, {
      createCommandsFolder: false,
    } as IInitCommandValues);

    expect(() => readdirSync(path.resolve(PROJECT_ROOT, "commands"))).toThrow();
  });

  it("should create create commands folder", async () => {
    await runCommand(InitCommand, {
      createCommandsFolder: true,
      commandsFolderLocation: "./commands",
      containedWithinTsProject: false,
      customDistFolder: "./commands/build",
    } as IInitCommandValues);

    const files = getAllFiles(path.resolve(PROJECT_ROOT, "commands"));

    expect(files).toMatchObject([
      "/project/commands/src/commands/sample.command.ts",
      "/project/commands/src/setup.ts",
      "/project/commands/tsconfig.json",
    ]);
  });

  it("should add build:commands npm script", async () => {
    await runCommand(InitCommand, {
      createCommandsFolder: true,
      commandsFolderLocation: "./commands",
      containedWithinTsProject: false,
      customDistFolder: "./commands/build",
    } as IInitCommandValues);

    const packagejson = require(path.resolve(PROJECT_ROOT, "package.json"));

    expect(packagejson.scripts["build:commands"]).toBeTruthy();
  });

  it("should add commands folder to src if contained within ts project", async () => {
    await runCommand(InitCommand, {
      createCommandsFolder: true,
      commandsFolderLocation: "./src/commands",
      containedWithinTsProject: true,
      customDistFolder: "./build",
    } as IInitCommandValues);

    expect(
      getAllFiles(path.resolve(PROJECT_ROOT, "src/commands"))
    ).toMatchObject([
      "/project/src/commands/commands/sample.command.ts",
      "/project/src/commands/setup.ts",
    ]);
  });
});
