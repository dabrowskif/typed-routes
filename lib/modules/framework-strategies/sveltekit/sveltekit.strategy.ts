import { Arg, ArgStrategy } from "../arg.strategy";
import { FrameworkStrategy } from "../framework.strategy";
import { DynamicOptionalArgStrategy } from "./arg-strategies/dynamic-optional.strategy";
import { DynamicRequiredArgStrategy } from "./arg-strategies/dynamic-required.strategy";
import { DynamicRestArgStrategy } from "./arg-strategies/dynamic-rest.strategy";
import { GroupArgStrategy } from "./arg-strategies/group.strategy";
import { StaticArgStrategy } from "./arg-strategies/static.strategy";

export class SvelteKitStrategy implements FrameworkStrategy {
  private readonly argStrategies: Record<ArgType, ArgStrategy> = {
    [ArgType.GROUP]: new GroupArgStrategy(),
    [ArgType.DYNAMIC_REST]: new DynamicRestArgStrategy(),
    [ArgType.DYNAMIC_OPTIONAL]: new DynamicOptionalArgStrategy(),
    [ArgType.DYNAMIC_REQUIRED]: new DynamicRequiredArgStrategy(),
    // INFO: Static strategy should be the last as it is a fallback strategy.
    [ArgType.STATIC]: new StaticArgStrategy(),
  };

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
      Object.values(this.argStrategies).find((strategy) =>
        strategy.isMatching(fileName),
      ) || this.argStrategies[ArgType.STATIC]
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

enum ArgType {
  DYNAMIC_OPTIONAL,
  DYNAMIC_REQUIRED,
  DYNAMIC_REST,
  GROUP,
  STATIC,
}
