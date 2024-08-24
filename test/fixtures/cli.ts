import {
  Framework,
  ModuleSystem,
  ProgramOptions,
  RequiredProgramOptions,
} from "../../lib/modules/program/cli/types";
import { faker } from "@faker-js/faker";

export const fakeRequiredProgramOptions = (
  data?: RequiredProgramOptions,
): RequiredProgramOptions => ({
  rootDirectory: faker.system.directoryPath(),
  framework: faker.helpers.enumValue(Framework),
  ...data,
});

export const fakeProgramOptions = (
  data?: Partial<ProgramOptions>,
): ProgramOptions => ({
  ...fakeRequiredProgramOptions(),
  outputDirectory: faker.system.directoryPath(),
  outputFileName: faker.system.fileName(),
  verbose: faker.datatype.boolean(),
  functionName: faker.lorem.word(),
  moduleSystem: faker.helpers.enumValue(ModuleSystem),
  ...data,
});

export const fakeRequiredProcessArgs = (
  data: Partial<RequiredProgramOptions> = {},
): string[] => {
  const args = ["node", "script.js"];

  args.push("-r", data.rootDirectory ?? faker.system.directoryPath());
  args.push("-f", data.framework ?? faker.helpers.enumValue(Framework));

  return args;
};

export const fakeProcessArgs = (
  data: Partial<ProgramOptions> = {},
): string[] => {
  const args = ["node", "script.js"];
  const options = fakeProgramOptions();

  args.push("-r", data.rootDirectory ?? options.rootDirectory);
  args.push("-f", data.framework ?? options.framework);

  if (data.outputDirectory || options.outputDirectory) {
    args.push("-od", (data.outputDirectory ?? options.outputDirectory)!);
  }

  if (data.outputFileName || data.outputFileName) {
    args.push("-of", (data.outputFileName ?? options.outputFileName)!);
  }
  if (data.verbose !== undefined || data.verbose !== undefined) {
    args.push("-v", String(data.verbose ?? options.verbose)!);
  }
  if (data.functionName || data.functionName) {
    args.push("-fn", (data.functionName ?? options.functionName)!);
  }
  if (data.moduleSystem || data.moduleSystem) {
    args.push("-ms", (data.moduleSystem ?? options.moduleSystem)!);
  }

  return args;
};
