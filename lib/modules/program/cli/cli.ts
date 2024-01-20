import { Command } from "commander";
import type { ProgramOptions } from "./types";
import {
  framework,
  functionName,
  moduleSystem,
  outputDirectory,
  outputFileName,
  rootDirectory,
  verboseLogging,
} from "./options";

export class CLI {
  getProgramOptions(args: string[]): ProgramOptions {
    return new Command()
      .addOption(rootDirectory)
      .addOption(outputDirectory)
      .addOption(outputFileName)
      .addOption(verboseLogging)
      .addOption(functionName)
      .addOption(moduleSystem)
      .addOption(framework)
      .parse(args)
      .opts<ProgramOptions>();
  }
}
