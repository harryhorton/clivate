import {
  replaceTemplateName,
  writeTemplate,
  readFile,
  writeTemplateFolder,
  // readFile,
} from "./templates";
import mockfs from "mock-fs";
import path from "path";

const mockload = (filepath: string) =>
  // @ts-ignore
  mockfs.load(path.resolve(__dirname, filepath), {
    recursive: true,
    lazy: true,
  });

describe("templates", () => {
  describe("replaceTemplateName", () => {
    it("should replace {{key}} with value", () => {
      expect(
        replaceTemplateName("/file/path/name{{key}}.ts.hbs", { key: "value" })
      ).toBe("/file/path/namevalue.ts");
    });

    it("should replace multiple keys with their values", () => {
      expect(
        replaceTemplateName("/file/path/name{{b}}{{a}}.ts.hbs", {
          a: "a",
          b: "b",
          c: "c",
        })
      ).toBe("/file/path/nameba.ts");
    });
    it("should do nothing if no key", () => {
      expect(
        replaceTemplateName("/file/path/name{{noKey}}.ts.hbs", { key: "value" })
      ).toBe("/file/path/name{{noKey}}.ts");
    });
  });

  describe("writeTemplate", () => {
    it("should write template", () => {
      mockfs({
        "/samples": {
          templates: {
            "{{a}}.ts.hbs": mockload("./fixtures/templates/{{a}}.ts.hbs"),
          },
        },
      });
      writeTemplate({
        sourceFile: path.join("/samples/templates/{{a}}.ts.hbs"),
        destinationDir: path.join("/samples/path2"),
        values: {
          a: "A",
        },
      });
      expect(readFile(`/samples/path2/A.ts`)).toBe(`export const func = "A";\n`);
      mockfs.restore();
    });
  });

  describe("writeTemplateFolder", () => {
    it("should write template folder", () => {
      mockfs({
        "/samples": {
          templates: {
            //@ts-ignore
            "{{a}}.ts.hbs": mockload("./fixtures/templates/{{a}}.ts.hbs"),
            //@ts-ignore
            "{{b}}.ts.hbs": mockload("./fixtures/templates/{{b}}.ts.hbs"),
            nested: {
              //@ts-ignore
              "{{b}}.ts.hbs": mockload("./fixtures/templates/{{b}}.ts.hbs"),
              //@ts-ignore
              "regular.ts": mockload("./fixtures/templates/regular.ts"),
            },
          },
        },
      });
      writeTemplateFolder({
        sourceFolder: "/samples/templates",
        desintationFolder: "/samples/path2",
        values: {
          a: "A",
          b: "B",
        },
      });
      expect(readFile(`/samples/path2/A.ts`)).toBe(`export const func = "A";\n`);
      expect(readFile(`/samples/path2/B.ts`)).toBe(`export const func = "B";\n`);
      expect(readFile(`/samples/path2/nested/B.ts`)).toBe(
        `export const func = "B";\n`
      );
      expect(readFile(`/samples/path2/nested/regular.ts`)).toBe(
        `export const func = "c";\n`
      );
      mockfs.restore();
    });
  });
});
