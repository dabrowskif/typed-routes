import {
  Arg,
  ArgStrategy,
  FrameworkStrategy,
} from "./framework-strategies/types";
import { SVELTEKIT_STRATEGY } from "./framework-strategies/sveltekit/sveltekit.strategy";
import { Logger } from "../utils/logger";
import { Framework } from "../utils/cli/types";

export class ArgParser {
  private readonly frameworkStrategies: Record<Framework, FrameworkStrategy> = {
    [Framework.SVELTEKIT]: SVELTEKIT_STRATEGY,
    // [Framework.NEXTJS]: SVELTEKIT_STRATEGY, // TODO implement nextjs
  };
  private readonly frameworkStrategy: FrameworkStrategy;

  constructor(
    private readonly logger: Logger,
    private readonly framework: Framework,
  ) {
    this.frameworkStrategy = this.frameworkStrategies[this.framework];
  }

  /**
   * Gets file metadata for a given file name, parent arguments, and path.
   */
  getFileMetadata(fileName: string, parentArgs: Arg[], parentPath: string) {
    const argStrategy = this.getMatchingArgStrategy(fileName);
    const arg = argStrategy.extractArg(fileName);
    const newArgs = arg ? [...parentArgs, arg] : parentArgs;
    const pathSegment = argStrategy.getPathSegment(arg);
    const fullPath = parentPath + pathSegment;
    const functionValue = this.getFunctionValue(fullPath, newArgs);

    return {
      currentArgs: newArgs,
      fullPath,
      functionValue,
    };
  }

  /**
   * Finds the matching argument strategy for the given file name.
   * Defaults to STATIC strategy if no matching strategy is found.
   */
  private getMatchingArgStrategy(fileName: string): ArgStrategy {
    return (
      this.frameworkStrategy.argStrategies.find((strategy) =>
        strategy.isMatching(fileName),
      ) || this.frameworkStrategy.defaultArgStrategy
    );
  }

  /**
   * Generates a route function string based on the full path and arguments.
   */
  private getFunctionValue(fullPath: string, args: Arg[]): string {
    const functionArgs = args
      .filter((arg) => arg.isDynamic)
      .map((arg) => {
        // TODO: unnecessary if statement, however typescript cannot  infer proper type based on previous .filter call
        if (arg.isDynamic) {
          return arg.required
            ? `${arg.name}: ${arg.type}`
            : `${arg.name}: ${arg.type} | undefined`;
        }
      })
      .join(", ");

    const routeFunction =
      args.length > 0
        ? `(${functionArgs}) => \`${fullPath}\``
        : `() => \`${fullPath}\``;

    return routeFunction;
  }
}
