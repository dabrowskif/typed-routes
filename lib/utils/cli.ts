import { Command } from "commander";
import { Framework } from "../modules/framework-strategies/framework.strategy";
import path from "path";

export const setupCLIOptions = (args: string[]) =>
  new Command()
    .requiredOption("-d, --directory <path>", "Root directory path")
    .requiredOption(
      "-fr, --framework <type>",
      "Framework for which to generate routes",
    )
    .option(
      "-od, --output-directory <path>",
      "Output directory where the file is saved",
      path.join(process.cwd()),
    )
    .option(
      "-of, --output-file-name <name>",
      "Generated file name",
      path.join("routes.ts"),
    )
    .option("-v, --verbose", "Enable verbose logging", false)
    .option(
      "-fn, --function-name <name>",
      "Function name that will be used to get url path for given file",
      "_get",
    )
    .option(
      "-m, --module-system <type>",
      "Module system to use (commonjs or es6)",
      "es6",
    )
    .parse(args)
    .opts<CLIOptions>();

export type CLIOptions = {
  directory: string;
  verbose: boolean;
  outputDirectory: string;
  outputFileName: string;
  functionName: string;
  moduleSystem: string;
  framework: Framework;
};
