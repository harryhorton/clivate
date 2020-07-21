import { createCommand, addHandler } from "./command-functions";
import { flow } from "fp-ts/function";
import { runCommand } from "./run-command";

const baseCommand = createCommand({ name: "name", description: "description" });

describe("runCommand", () => {
  it("should run", async () => {
    const command = flow(addHandler((inputs) => inputs))(baseCommand);

    const results = await runCommand(command, { value: 1 });

    expect(results.value).toBe(1);
  });
});
