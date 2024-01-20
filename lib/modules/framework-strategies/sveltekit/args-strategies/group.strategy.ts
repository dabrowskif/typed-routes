import { Arg, ArgStrategy } from "../../types";

export class GroupArgStrategy implements ArgStrategy {
  private readonly matchRegexp = /^\(\w+\)$/;

  isMatching(fileName: string) {
    return this.matchRegexp.test(fileName);
  }

  extractArg(_fileName: string): Arg {
    return {
      isDynamic: false,
      name: "",
    };
  }

  getPathSegment(_arg: Arg) {
    return "";
  }
}
