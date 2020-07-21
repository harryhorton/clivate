import fs from "fs";
import Handlebars from "handlebars";
import path from "path";

export const replaceTemplateName = (name: string, values: {}) =>
  replaceHbs(
    Object.keys(values).reduce((prev, key) => {
      return prev.replace(`\{\{${key}\}\}`, values[key]);
    }, name) || name
  );

const replaceHbs = (path: string) => path.replace(/\.hbs$/, "");

export const readFile = (path: string) => {
  try {
    return fs.readFileSync(path, "utf-8");
  } catch {
    return null;
  }
};

export const createDir = (path: string) => {
  try {
    fs.readdirSync(path);
  } catch {
    fs.mkdirSync(path, { recursive: true });
  }
};

export const writeFile = (filePath: string, content: string) => {
  createDir(path.dirname(filePath));
  try {
    return fs.writeFileSync(filePath, content);
  } catch (e) {
    throw e;
  }
};

export const copyFile = (from: string, to: string) => {
  writeFile(to, readFile(from) || "");
};

export interface WriteTemplateOptions {
  sourceFile: string;
  destinationDir: string;
  values: {};
}

export const writeTemplate = ({
  sourceFile,
  destinationDir,
  values,
}: WriteTemplateOptions) => {
  const newPath = replaceTemplateName(
    path.resolve(destinationDir, path.basename(sourceFile)),
    values
  );
  const sourceContent = readFile(sourceFile);
  const newContent = Handlebars.compile(sourceContent)(values);
  writeFile(newPath, newContent);
};

/**
 * Recursively get all filepaths from passed directory
 */
export const getAllFiles = (dirPath: string): string[] =>
  fs.readdirSync(dirPath).reduce((previousPaths, currentFile) => {
    const fullPath = path.join(dirPath, currentFile);

    if (fs.statSync(fullPath).isDirectory())
      return [...previousPaths, ...getAllFiles(fullPath)];

    return [...previousPaths, fullPath];
  }, []);

export interface WriteTemplateFolderOptions {
  sourceFolder: string;
  desintationFolder: string;
  values: {};
}

export const writeTemplateFolder = ({
  sourceFolder,
  desintationFolder,
  values,
}: WriteTemplateFolderOptions) => {
  const fileList = getAllFiles(sourceFolder);
  fileList.forEach((filePath) => {
    const fileDestination = path.resolve(
      filePath.replace(sourceFolder, desintationFolder)
    );
    const destinationDir = path.dirname(fileDestination);
    if (filePath.endsWith(".hbs")) {
      writeTemplate({
        sourceFile: filePath,
        destinationDir,
        values,
      });
    } else {
      copyFile(filePath, fileDestination);
    }
  });
};
