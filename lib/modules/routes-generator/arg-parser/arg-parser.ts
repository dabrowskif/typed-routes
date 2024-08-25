import { Logger } from "../../../utils/logger/logger";
import { Framework } from "../../program/cli/types";
import { SveltekitStrategy } from "./framework-strategies/sveltekit/sveltekit.strategy";
import {
  type Arg,
  ArgStrategy,
  type FrameworkStrategy,
} from "./framework-strategies/types";

/**
 * Parses args from filenames depending on framework strategy
 */
export class ArgParser {
  private readonly frameworkStrategies: Record<Framework, FrameworkStrategy> = {
    [Framework.SVELTEKIT]: new SveltekitStrategy(),
    // [Framework.NEXTJS]: NEXT_JS, // TODO implement nextjs
  };
  private readonly frameworkStrategy: FrameworkStrategy;
  private readonly logger: Logger;

  constructor(private readonly framework: Framework) {
    this.frameworkStrategy = this.frameworkStrategies[this.framework];
    this.logger = new Logger(ArgParser.name);
  }

  /**
   * Gets file metadata for a given file name
   */
  getFileMetadata(fileName: string, parentArgs: Arg[], parentPath: string) {
    const argStrategy = this.getMatchingArgStrategy(fileName);
    const argToAdd = argStrategy.extractArg(fileName);
    const newArgs = argToAdd ? [...parentArgs, argToAdd] : parentArgs;
    const pathSegment = argStrategy.getPathSegment(argToAdd);
    const fullPath = parentPath + pathSegment;
    const functionValue = this.getFunctionValue(fullPath, newArgs);

    this.logger.debug("Generating file metadata", {
      parentPath,
      parentArgs,
      fileName,
      argStrategyName: argStrategy.name,
      arg: argToAdd,
      newArgs,
      pathSegment,
      fullPath,
      functionValue,
    });

    return {
      args: newArgs,
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
