import { Option } from "commander";
import path from "path";
import { Framework, ModuleSystem } from "./types";

export const rootDirectory = new Option(
  "-r, --root-directory <string>",
  "Root directory path",
).makeOptionMandatory(true);

export const framework = new Option(
  "-f, --framework <Framework>",
  "Framework for which to generate routes",
)
  .choices(Object.values(Framework))
  .makeOptionMandatory(true);

export const outputDirectory = new Option(
  "-od, --output-directory <string>",
  "Output directory where the file is saved",
).default(path.join(process.cwd()));

export const outputFileName = new Option(
  "-of, --output-file-name <string>",
  "Generated file name",
).default("routes.ts");

export const functionName = new Option(
  "-fn, --function-name <string>",
  "Function name that will be used to get url path for given file",
).default("_get");

export const moduleSystem = new Option(
  "-m, --module-system <ModuleSystem>",
  "Module system to use (commonjs or es6)",
)
  .choices(Object.values(ModuleSystem))
  .default(ModuleSystem.ES6);

export const verbose = new Option(
  "-v, --verbose <boolean>",
  "Enable verbose logging",
)
  .default(false)
  .argParser(Boolean);
