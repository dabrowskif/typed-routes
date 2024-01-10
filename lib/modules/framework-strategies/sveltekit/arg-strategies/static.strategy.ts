import { Arg, ArgStrategy } from "../../arg.strategy";

export class StaticArgStrategy implements ArgStrategy {
  isMatching(_fileName: string) {
    return true;
  }

  extractArg(fileName: string): Arg {
    return {
      isDynamic: false,
      name: fileName,
    };
  }

  getPathSegment(arg: Arg) {
    return "/" + arg.name;
  }
}
