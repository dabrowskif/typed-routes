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
} from "./cli-options";

export class CLI {
  /**
   * Parses command line arguments and returns js object with all options passed
   */
  generateProgramOptions(args: string[]): ProgramOptions {
    return new Command()
      .addOption(rootDirectory)
      .addOption(outputDirectory)
      .addOption(outputFileName)
      .addOption(verbose)
      .addOption(functionName)
      .addOption(moduleSystem)
      .addOption(framework)
      .parse(args)
      .opts<ProgramOptions>();
  }
}
