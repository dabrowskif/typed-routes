import * as path from "path";
import * as fs from "fs";
import { FileTreeGenerator } from "./modules/file-tree-generator";
import { Logger } from "./utils/logger";
import { RoutesGenerator } from "./modules/routes-generator";
import { CLIOptions, setupCLIOptions } from "./utils/cli";

export class Program {
  private logger: Logger;
  private options: CLIOptions;

  constructor(args: string[]) {
    this.options = setupCLIOptions(args);
    this.logger = new Logger(this.options);
  }

  run() {
    this.logger.info("Running with options");
    this.logger.info(this.options);
    try {
      const fileTree = new FileTreeGenerator(this.logger).generate(
        this.options.directory,
      );
      const routes = new RoutesGenerator(this.options, this.logger).generate(
        fileTree,
        this.options.functionName,
      );

      this.writeRoutesToFile(routes, this.options);
    } catch (error) {
      this.handleError(error);
    }
  }

  private writeRoutesToFile(routes: string, options: CLIOptions) {
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
