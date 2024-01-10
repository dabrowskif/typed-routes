import { Arg, ArgStrategy } from "../../arg.strategy";

export class DynamicRestArgStrategy implements ArgStrategy {
  private readonly matchRegexp = /^\[\.\.\.\w+\]$/;
  private readonly extractRegexp = /^\[\.\.\.(\w+)\]$/;

  isMatching(fileName: string) {
    return this.matchRegexp.test(fileName);
  }

  extractArg(fileName: string): Arg {
    const match = this.extractRegexp.exec(fileName);
    const arg = match?.[1];

    if (!arg) {
      throw new Error(
        "Argument was matched properly, but did not extract properly.",
      );
    }

    return {
      isDynamic: true,
      type: "string[]",
      name: arg,
      required: true,
    };
  }

  getPathSegment(arg: Arg) {
    return `\$\{${arg.name}.length > 0 ? '/' + ${arg.name}.join('/') : ''\}`;
  }
}
