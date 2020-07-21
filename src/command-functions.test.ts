
import {
  addName,
  addDescription,
  addArgs,
  addOptions,
  addPrompts,
  addMessage,
  addMessageBeforeHandler,
  addMessageAfterHandler,
  addHandler,
  createCommand,
  CommandDefaultProperties,
} from "./command-functions";
import { flow } from "fp-ts/lib/function";

describe("command functions", () => {
  describe("createCommand", () => {
    it("should create a command object", () => {
      expect(createCommand({})).toMatchObject(CommandDefaultProperties);
    });
  });

  describe("addName", () => {
    it("should addName", () => {
      expect(addName("name")(createCommand({}))).toMatchObject({
        name: "name",
      });
    });
  });

  describe("addDescription", () => {
    it("should addDescription", () => {
      expect(addDescription("name")(createCommand({}))).toMatchObject({
        description: "name",
      });
    });
  });

  describe("addArgs", () => {
    it("should addArgs", () => {
      expect(addArgs("arg")(createCommand({}))).toMatchObject({
        args: "arg",
      });
    });
  });

  describe("addOptions", () => {
    it("should addOptions", () => {
      expect(addOptions([["options"]])(createCommand({}))).toMatchObject({
        options: [["options"]],
      });
    });
  });

  describe("addPrompts", () => {
    it("should addPrompts", () => {
      const prompts = [
        {
          name: "prompt1",
          type: "confirm",
        },
      ];
      expect(addPrompts(prompts)(createCommand({}))).toMatchObject({
        prompts: prompts,
      });
    });
    it("should add function prompts", () => {
      const prompts = [
        {
          name: "prompt1",
          type: "confirm",
        },
      ];
      const command = addPrompts(() => prompts)(createCommand({}));
      //@ts-ignore
      expect(command.prompts()).toMatchObject(prompts);
    });
  });
  describe("addHandler", () => {
    it("should add handler", () => {
      const handler = () => 1;
      const command = addHandler(handler)(createCommand({}));
      expect(command.handler()).toBe(1);
    });
  });

  describe("addMessage", () => {
    it("should addMessage", () => {
      expect(addMessage("message")(createCommand({}))).toMatchObject({
        message: "message",
      });
    });
  });

  describe("addMessageBeforeHandler", () => {
    it("should addMessageBeforeHandler", () => {
      expect(
        addMessageBeforeHandler("message")(createCommand({}))
      ).toMatchObject({
        messageBeforeHandler: "message",
      });
    });
  });

  describe("addMessageAfterHandler", () => {
    it("should addMessageAfterHandler", () => {
      expect(
        addMessageAfterHandler("message")(createCommand({}))
      ).toMatchObject({
        messageAfterHandler: "message",
      });
    });
  });

  describe("command functions together", () => {
    it("should be able to use command functions together with fp-ts", () => {
      const command = flow(
        addName("name"),
        addDescription("name"),
        addArgs("arg"),
        addOptions([["options"]]),
        addMessage("message"),
        addPrompts([
          {
            name: "prompt1",
            type: "confirm",
          },
        ]),
        addMessageBeforeHandler("message"),
        addMessageAfterHandler("message"),
        addHandler(() => 1)
      )(createCommand());

      expect(command).toMatchObject({
        args: "arg",
        description: "name",
        message: "message",
        messageBeforeHandler: "message",
        messageAfterHandler: "message",
        name: "name",
        options: [["options"]],
        prompts: [
          {
            name: "prompt1",
            type: "confirm",
          },
        ],
      });

      expect(command.handler()).toBe(1);
    });
  });
});
