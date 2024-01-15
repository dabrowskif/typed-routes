import * as fs from "fs";
import * as path from "path";
import { Logger } from "../utils/logger";

export class FileTreeGenerator {
  constructor(private readonly logger: Logger) {}

  /**
   * Generates a file tree from the provided directory path.
   */
  generate(dirPath: string): FileTree {
    const absoluteDirPath = this.getAbsoluteDirPath(dirPath);

    this.logger.info(`Directory path: ${absoluteDirPath}`);

    if (!this.isDirectory(absoluteDirPath)) {
      const message = "File at provided path is not a directory";
      this.logger.error(message);
      throw new Error(message);
    }

    this.logger.info("Generating file tree...");

    const fileTree = this.getDirectoryFileTree(absoluteDirPath);

    this.logger.success(`File tree has been generated`);

    return fileTree;
  }

  private getAbsoluteDirPath(dirPath: string): string {
    return path.isAbsolute(dirPath)
      ? dirPath
      : path.resolve(process.cwd(), dirPath);
  }

  /**
   * Recursively builds a file tree from a directory.
   */
  private getDirectoryFileTree(currentDirPath: string): FileTree {
    // this.logger.info(`Entering ${currentDirPath}`);
    const fileNames = this.getDirectoryFilesNames(currentDirPath);

    return fileNames.reduce(
      (fileTree, fileName) => {
        const filePath = this.getFilePath(currentDirPath, fileName);
        // this.logger.info(`Generating ${fileName}`);

        fileTree[fileName] = this.isDirectory(filePath)
          ? this.getDirectoryFileTree(filePath)
          : null;

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
    return fs.statSync(path).isDirectory();
  }
}

export type FileTree = {
  [key: string]: FileTree;
} | null;
