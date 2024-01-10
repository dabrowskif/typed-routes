/**
 * Abstract class representing a strategy for handling arguments in route generation.
 * This class defines a contract for methods to be implemented for different types of arguments.
 */
export abstract class ArgStrategy {
  /**
   * Abstract method to determine if the given file name matches the argument pattern.
   */
  abstract isMatching(fileName: string): boolean;

  /**
   * Abstract method to extract the argument from the file name.
   */
  abstract extractArg(fileName: string): Arg;

  /**
   * Abstract method to get the path segment representation of the argument.
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
      type: "string" | "string[]";
      required: boolean;
    }
);
