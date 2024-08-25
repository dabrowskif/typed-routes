import * as fs from 'fs';
import * as path from 'path';

import { Logger } from '../../utils/logger/logger';
import { FileTreeGenerator } from '../file-tree-generator/file-tree-generator';
import { RoutesGenerator } from '../routes-generator/routes-generator';
import type { ProgramOptions } from './cli/types';

export class Program {
  private readonly logger: Logger;
  private readonly fileTreeGenerator: FileTreeGenerator;
  private readonly routesGenerator: RoutesGenerator;

  constructor(private readonly options: ProgramOptions) {
    this.logger = new Logger(Program.name);
    this.fileTreeGenerator = new FileTreeGenerator();
    this.routesGenerator = new RoutesGenerator(this.options.framework);
  }

  run() {
    this.logger.debug('Running with options', this.options);

    const { rootDirectory, moduleSystem, functionName, outputDirectory, outputFileName } = this.options;

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

  private writeRoutesToFile(routes: string, options: { outputDirectory: string; outputFileName: string }) {
    const finalFilePath = path.join(options.outputDirectory, options.outputFileName);
    fs.writeFileSync(finalFilePath, routes, 'utf-8');
    this.logger.info(`Routes saved to ${finalFilePath}`);
  }

  private handleError(error: unknown) {
    const errorMessage = this.extractErrorMessage(error);

    if (errorMessage) {
      this.logger.error(errorMessage, error);
    } else {
      this.logger.error('An unexpected error has occured.');
      throw error;
    }

    process.exit(1);
  }

  private extractErrorMessage(error: unknown) {
    return typeof error === 'object' && error && 'message' in error ? (error?.message as string) : '';
  }
}
