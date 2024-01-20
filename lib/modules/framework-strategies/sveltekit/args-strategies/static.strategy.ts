import { Arg, ArgStrategy } from "../../types";

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
