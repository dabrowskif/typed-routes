import * as path from "path";
import * as fs from "fs";
import { FileTreeGenerator } from "./modules/file-tree-generator";
import { Logger } from "./utils/logger";
import { RoutesGenerator } from "./modules/routes-generator";
import { CLI } from "./utils/cli";
import { ArgParser } from "./modules/arg-parser";
import { ProgramOptions } from "./utils/cli/types";

export class Program {
  private readonly logger: Logger;
  private readonly options: ProgramOptions;
  private readonly fileTreeGenerator: FileTreeGenerator;
  private readonly routesGenerator: RoutesGenerator;
  private readonly argParser: ArgParser;
  private readonly cli: CLI;

  constructor(args: string[]) {
    this.cli = new CLI(args);
    this.options = this.cli.getProgramOptions();
    this.logger = new Logger(this.options.verboseLogging);
    this.fileTreeGenerator = new FileTreeGenerator(this.logger);
    this.argParser = new ArgParser(this.logger, this.options.framework);
    this.routesGenerator = new RoutesGenerator(this.logger, this.argParser);
  }

  run() {
    this.logger.info("Running with options");
    this.logger.info(this.options);

    const {
      rootDirectory,
      moduleSystem,
      functionName,
      outputDirectory,
      outputFileName,
    } = this.options;

    try {
      const fileTree = this.fileTreeGenerator.generate(rootDirectory);
      const routes = this.routesGenerator.generate(fileTree, {
        moduleSystem,
        functionName,
      });

      this.writeRoutesToFile(routes, {
        outputFileName,
        outputDirectory,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  private writeRoutesToFile(
    routes: string,
    options: { outputDirectory: string; outputFileName: string },
  ) {
    const finalFilePath = path.join(
      options.outputDirectory,
      options.outputFileName,
    );
    this.logger.info(`Saving generated routes to ${finalFilePath}`);
    fs.writeFileSync(finalFilePath, routes, "utf-8");
    this.logger.success(`Routes saved.`);
  }

  private handleError(error: any) {
    const errorMessage = error?.message;

    if (errorMessage) {
      this.logger.error(errorMessage, error);
    } else {
      this.logger.error("An unexpected error has occured.");
      throw error;
    }

    process.exit(1);
  }
}
