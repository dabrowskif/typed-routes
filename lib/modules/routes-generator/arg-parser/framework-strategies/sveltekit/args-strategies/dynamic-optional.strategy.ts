import { ArgExtractingError } from "../../errors";
import { type Arg, ArgStrategy } from "../../types";

export class DynamicOptionalArgStrategy implements ArgStrategy {
  readonly name = DynamicOptionalArgStrategy.name;
  private readonly matchRegexp = /^\[\[\w+\]\]$/;
  private readonly extractRegexp = /^\[\[(\w+)\]\]$/;

  isMatching(fileName: string) {
    return this.matchRegexp.test(fileName);
  }

  extractArg(fileName: string): Arg {
    const match = this.extractRegexp.exec(fileName);
    const arg = match?.[1];

    if (!arg) {
      throw new ArgExtractingError(
        "Argument was matched properly, but did not extract properly.",
      );
    }

    return {
      isDynamic: true,
      type: "string",
      name: arg,
      required: false,
    };
  }

  getPathSegment(arg: Arg) {
    return `\$\{${arg.name} ? "/" + ${arg.name} : ""\}`;
  }
}
