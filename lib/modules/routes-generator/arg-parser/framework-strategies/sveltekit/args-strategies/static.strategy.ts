import { type Arg, ArgStrategy } from "../../types";

export class StaticArgStrategy implements ArgStrategy {
  readonly name = StaticArgStrategy.name;
  isMatching(_fileName: string) {
    return true;
  }

  extractArg(fileName: string): Arg {
    // INFO: no logic here as sveltekit static arg is exact route path segment
    return {
      isDynamic: false,
      name: fileName,
    };
  }

  getPathSegment(arg: Arg) {
    return "/" + arg.name;
  }
}
