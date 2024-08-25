import { ModuleSystem, ProgramOptions, RequiredProgramOptions } from './types';

export const DEFAULT_PROGRAM_OPTIONS: Omit<ProgramOptions, keyof RequiredProgramOptions> = {
  outputDirectory: process.cwd(),
  outputFileName: 'routes.ts',
  functionName: '_get',
  moduleSystem: ModuleSystem.ES6,
  verbose: false,
};
