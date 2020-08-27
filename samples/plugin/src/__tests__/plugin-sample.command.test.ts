import { runCommand } from "clivate";
import {
  PluginSampleCommand,
  MESSAGE,
} from "../commands/plugin-sample.command";
describe("plugin-sample command", () => {
  it("should log it works!", async () => {
    console.log = jest.fn();

    await runCommand(PluginSampleCommand, {});

    expect(console.log).toHaveBeenCalledWith(MESSAGE);

    (console.log as jest.Mock).mockRestore()
  });
});
