import {
  fakeProcessArgs,
  fakeRequiredProcessArgs,
} from "../../../../test/fixtures/cli";
import { CLI } from "./cli";
import { Framework, ModuleSystem } from "./types";

describe("CLI", () => {
  let cli: CLI;

  beforeEach(() => {
    cli = new CLI();
  });

  it("should return process.exit code as undefined because all required options are passed", () => {
    let exitCode: number | undefined = undefined;
    // @ts-expect-error - for testing purposes
    process.exit = (code: number) => {
      exitCode = code;
    };

    cli.generateProgramOptions([
      "node",
      "index.js",
      "-r",
      "someRootDir/",
      "-f",
      "sveltekit",
    ]);

    expect(exitCode).toBe(undefined);
  });

  it.each([
    {
      label: "no framework and root dir specified",
      args: ["node", "index.js"],
    },
    {
      label: "no framework specified",
      args: ["node", "index.js", "-r", "someRootDir/"],
    },
    {
      label: "no root specified",
      args: ["node", "index.js", "-f", "sveltekit"],
    },
  ])(
    "should return process.exit code as 1 because $label",
    async ({ args }) => {
      let exitCode: number | undefined = undefined;
      // @ts-expect-error - for testing purposes
      process.exit = (code: number) => {
        exitCode = code;
      };

      cli.generateProgramOptions(args);

      expect(exitCode).toBe(1);
    },
  );

  it.each([
    {
      label: "framework",
      args: fakeRequiredProcessArgs({
        framework: "wrong-framework" as Framework,
      }),
    },
    {
      label: "moduleSystem",
      args: fakeProcessArgs({
        moduleSystem: "wrong-module-system" as ModuleSystem,
      }),
    },
  ])(
    "it should throw because wrong argument $label provided",
    async ({ args }) => {
      expect(() => cli.generateProgramOptions(args)).toThrow();
    },
  );
});
