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
    private readonly cliOptions: CLIOptions,
    private readonly logger: Logger,
  ) {
    this.frameworkStrategy =
      this.frameworkStrategies[this.cliOptions.framework];
  }

  /**
   * Generates a stringified representation of the routes based on the file tree.
   */
  generate(rootFileTree: FileTree, functionName: string): string {
    this.logger.info("Generating routes...");

    const stringifiedFileTree = this.getStringifiedFileTree(
      rootFileTree,
      functionName,
    );
    const rootString = this.stringifyRoot(
      stringifiedFileTree,
      this.cliOptions.moduleSystem,
    );

    this.logger.success(`Routes have been generated`);

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
    switch (moduleSystem) {
      case "es6":
        return `export const routes = {${content}}`;
      case "commonjs":
        return `module.exports.routes = {${content}}`;
      default:
        throw new Error(`Unsupported module system: ${moduleSystem}`);
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
