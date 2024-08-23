import { Framework, ModuleSystem } from "../program/cli/types";
import { Logger } from "../../utils/logger/logger";
import { ArgParser } from "./arg-parser/arg-parser";
import type { FileTree } from "../file-tree-generator/types";
import type { Arg } from "./arg-parser/framework-strategies/types";

export class RoutesGenerator {
  private readonly logger: Logger;
  private readonly argParser: ArgParser;

  constructor(private readonly framework: Framework) {
    this.logger = new Logger(RoutesGenerator.name);
    this.argParser = new ArgParser(this.framework);
  }

  /**
   * Generates a stringified representation of the routes based on the file tree.
   */
  generate(
    rootFileTree: FileTree,
    options: { functionName: string; moduleSystem: ModuleSystem },
  ): string {
    this.logger.info("Generating routes...");

    const stringifiedFileTree = this.getStringifiedFileTree(
      rootFileTree,
      options.functionName,
    );
    const rootString = this.stringifyRoot(
      stringifiedFileTree,
      options.moduleSystem,
    );
    // TODO: reuse success
    this.logger.info(`Routes have been generated`);

    return rootString;
  }

  private getStringifiedFileTree(
    parentFileTree: FileTree,
    functionName: string,
    parentArgs: Arg[] = [],
    parentPath: string = "",
  ): string {
    this.logger.debug("Getting stringified file tree...");
    if (!parentFileTree) {
      return "";
    }

    return Object.entries(parentFileTree).reduce(
      (stringifiedParentFileTree, [fileName, fileTree]) => {
        if (!fileTree) {
          return stringifiedParentFileTree;
        }

        const { args, fullPath, functionValue } =
          this.argParser.getFileMetadata(fileName, parentArgs, parentPath);

        const stringifiedFileTree = this.getStringifiedFileTree(
          fileTree,
          functionName,
          args,
          fullPath,
        );

        const stringifiedRoute = this.stringifyRoute(
          fileName,
          functionName,
          functionValue,
          stringifiedFileTree,
        );
        return stringifiedParentFileTree + stringifiedRoute;
      },
      "",
    );
  }

  private stringifyRoot(content: string, moduleSystem: ModuleSystem): string {
    this.logger.debug("Stringifying root...");
    let rootString = `// This file is autogenerated by the Typed Route Generator.\n// Do not edit this file directly as changes may be overwritten.\n`;
    switch (moduleSystem) {
      case ModuleSystem.ES6:
        return rootString + `export const routes = {${content}}`;
      case ModuleSystem.COMMONJS:
        return rootString + `module.exports.routes = {${content}}`;
      default:
        this.logger.error(`Unsupported module system: ${moduleSystem}`);
        process.exit(1);
    }
  }

  private stringifyRoute(
    name: string,
    functionName: string,
    functionValue: string,
    content?: string,
  ): string {
    return content
      ? `'${name}': { ${functionName}: ${functionValue}, ${content} },`
      : `'${name}': { ${functionName}: ${functionValue} },`;
  }
}
