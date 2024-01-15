import { CLIOptions } from "../utils/cli";
import { Logger } from "../utils/logger";
import { FileTree } from "./file-tree-generator";
import { Arg } from "./framework-strategies/arg.strategy";
import {
  Framework,
  FrameworkStrategy,
} from "./framework-strategies/framework.strategy";
import { SvelteKitStrategy } from "./framework-strategies/sveltekit/sveltekit.strategy";

export class RoutesGenerator {
  private readonly frameworkStrategies: Record<Framework, FrameworkStrategy> = {
    [Framework.SVELTEKIT]: new SvelteKitStrategy(),
  };
  private readonly frameworkStrategy: FrameworkStrategy;

  constructor(
    private readonly logger: Logger,
    private readonly framework: Framework,
  ) {
    this.frameworkStrategy = this.frameworkStrategies[this.framework];
  }

  /**
   * Generates a stringified representation of the routes based on the file tree.
   */
  generate(
    rootFileTree: FileTree,
    options: { functionName: string; moduleSystem: string },
  ): string {
    this.logger.info("Generating routes...\n");

    const stringifiedFileTree = this.getStringifiedFileTree(
      rootFileTree,
      options.functionName,
    );
    const rootString = this.stringifyRoot(
      stringifiedFileTree,
      options.moduleSystem,
    );

    this.logger.success(`\nRoutes have been generated`);

    return rootString;
  }

  private getStringifiedFileTree(
    parentFileTree: FileTree,
    functionName: string,
    parentArgs: Arg[] = [],
    parentPath: string = "",
  ): string {
    if (!parentFileTree) {
      return "";
    }

    return Object.entries(parentFileTree).reduce(
      (stringifiedParentFileTree, [fileName, fileTree]) => {
        if (!fileTree) {
          return stringifiedParentFileTree;
        }

        const { currentArgs, fullPath, functionValue } =
          this.frameworkStrategy.getFileMetadata(
            fileName,
            parentArgs,
            parentPath,
          );

        const stringifiedFileTree = this.getStringifiedFileTree(
          fileTree,
          functionName,
          currentArgs,
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

  private stringifyRoot(content: string, moduleSystem: string): string {
    let rootString = `// This file is autogenerated by the Typed Route Generator.\n// Do not edit this file directly as changes may be overwritten.\n`;
    switch (moduleSystem) {
      case "es6":
        return rootString + `export const routes = {${content}}`;
      case "commonjs":
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
