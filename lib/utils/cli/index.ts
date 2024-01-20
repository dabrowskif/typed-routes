import { Command } from "commander";
import { ProgramOptions } from "./types";
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
  constructor(private readonly args: string[]) {}

  getProgramOptions(): ProgramOptions {
    return new Command()
      .addOption(rootDirectory)
      .addOption(outputDirectory)
      .addOption(outputFileName)
      .addOption(verboseLogging)
      .addOption(functionName)
      .addOption(moduleSystem)
      .addOption(framework)
      .parse(this.args)
      .opts<ProgramOptions>();
  }
}
