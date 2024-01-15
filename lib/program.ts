import * as path from "path";
import * as fs from "fs";
import { FileTreeGenerator } from "./modules/file-tree-generator";
import { Logger } from "./utils/logger";
import { RoutesGenerator } from "./modules/routes-generator";
import { CLIOptions, setupCLIOptions } from "./utils/cli";

export class Program {
  private readonly logger: Logger;
  private readonly options: CLIOptions;
  private readonly fileTreeGenerator: FileTreeGenerator;
  private readonly routesGenerator: RoutesGenerator;

  constructor(args: string[]) {
    this.options = setupCLIOptions(args);
    this.logger = new Logger(this.options.verbose);
    this.fileTreeGenerator = new FileTreeGenerator(this.logger);
    this.routesGenerator = new RoutesGenerator(
      this.logger,
      this.options.framework,
    );
  }

  run() {
    this.logger.info("Running with options");
    this.logger.info(this.options);

    const {
      directory,
      moduleSystem,
      functionName,
      outputDirectory,
      outputFileName,
    } = this.options;

    try {
      const fileTree = this.fileTreeGenerator.generate(directory);
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
      this.logger.error(errorMessage);
      if (this.options.verbose) {
        console.error(error);
      }
    } else {
      this.logger.error("An unexpected error has occured.");
      throw error;
    }

    process.exit(1);
  }
}
