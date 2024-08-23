import { Command } from "commander";
import type { ProgramOptions } from "./types";
import {
  framework,
  functionName,
  moduleSystem,
  outputDirectory,
  outputFileName,
  rootDirectory,
  verbose,
} from "./options";

export const PROGRAM_OPTIONS = new Command()
  .addOption(rootDirectory)
  .addOption(outputDirectory)
  .addOption(outputFileName)
  .addOption(verbose)
  .addOption(functionName)
  .addOption(moduleSystem)
  .addOption(framework)
  .parse(process.argv)
  .opts<ProgramOptions>();
