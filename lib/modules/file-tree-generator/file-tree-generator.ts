import * as fs from 'fs';
import * as path from 'path';

import { Logger } from '../../utils/logger/logger';
import type { FileTree } from './types';

export class FileTreeGenerator {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(FileTreeGenerator.name);
  }

  /**
   * Generates a file tree from the provided directory path.
   */
  generate(dirPath: string): FileTree {
    this.logger.info('Generating file tree...');
    const absoluteDirPath = this.getAbsoluteDirPath(dirPath);
    this.logger.debug(`Directory path: ${absoluteDirPath}`);

    if (!this.isDirectory(absoluteDirPath)) {
      this.logger.error('File at provided path is not a directory');
      process.exit(1);
    }

    const fileTree = this.getDirectoryFileTree(absoluteDirPath);

    this.logger.info(`File tree has been generated`);

    return fileTree;
  }

  private getAbsoluteDirPath(dirPath: string): string {
    return path.isAbsolute(dirPath) ? dirPath : path.resolve(process.cwd(), dirPath);
  }

  /**
   * Recursively builds a file tree from a directory.
   */
  private getDirectoryFileTree(currentDirPath: string): FileTree {
    this.logger.debug(`Entering ${currentDirPath}`);
    const fileNames = this.getDirectoryFilesNames(currentDirPath);

    return fileNames.reduce(
      (fileTree, fileName) => {
        const filePath = this.getFilePath(currentDirPath, fileName);
        this.logger.debug(`Generating ${fileName}`);

        fileTree[fileName] = this.isDirectory(filePath) ? this.getDirectoryFileTree(filePath) : null;

        return fileTree;
      },
      {} as Record<string, FileTree>,
    );
  }

  private getDirectoryFilesNames(path: string): string[] {
    return fs.readdirSync(path);
  }

  private getFilePath(currentPath: string, fileName: string): string {
    return path.join(currentPath, fileName);
  }

  private isDirectory(path: string): boolean {
    try {
      return fs.statSync(path).isDirectory();
    } catch {
      this.logger.fatal(
        'Error while trying to check routes directory path. Please ensure that you provided existing path.',
      );
      process.exit(1);
    }
  }
}
