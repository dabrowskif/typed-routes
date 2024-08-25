/**
 * Represents a strategy for handling arguments in route generation.
 */
export abstract class ArgStrategy {
  /**
   * For logging purfoses
   */
  abstract readonly name: string;

  /**
   * Determines if the given file name matches the argument pattern.
   */
  abstract isMatching(fileName: string): boolean;

  /**
   * Extracts the argument from the file name.
   */
  abstract extractArg(fileName: string): Arg;

  /**
   * Gets the path segment representation of the argument.
   */
  abstract getPathSegment(arg: Arg): string;
}

/**
 * Type representing an argument in a route.
 * An argument can be either dynamic or static.
 * Static arguments does not require variable to be set up.
 * Dynamic arguments have a type and a required flag.
 */
export type Arg = {
  name: string;
} & (
  | {
      isDynamic: false;
    }
  | {
      isDynamic: true;
      // TODO: implement number type
      type: 'string' | 'string[]';
      required: boolean;
    }
);

export abstract class FrameworkStrategy {
  abstract readonly defaultArgStrategy: ArgStrategy;
  abstract readonly argStrategies: ArgStrategy[];
}
