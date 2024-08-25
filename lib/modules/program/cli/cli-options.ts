import { Option } from 'commander';

import { DEFAULT_PROGRAM_OPTIONS } from './default-program-options';
import { Framework, ModuleSystem } from './types';

export const rootDirectory = new Option(
  '-r, --root-directory <string>',
  'Directory where all routes all stored',
).makeOptionMandatory(true);

export const framework = new Option('-f, --framework <Framework>', 'Framework for which to generate routes')
  .choices(Object.values(Framework))
  .makeOptionMandatory(true);

export const outputDirectory = new Option(
  '-od, --output-directory <string>',
  'Directory where the generated routes file is saved',
).default(DEFAULT_PROGRAM_OPTIONS.outputDirectory);

export const outputFileName = new Option(
  '-of, --output-file-name <string>',
  'Name of the file with generated routes',
).default(DEFAULT_PROGRAM_OPTIONS.outputFileName);

export const functionName = new Option(
  '-fn, --function-name <string>',
  'Function name that will be used to get url path for given file',
).default(DEFAULT_PROGRAM_OPTIONS.functionName);

export const moduleSystem = new Option(
  '-ms, --module-system <ModuleSystem>',
  'Module system for output file (commonjs or es6)',
)
  .choices(Object.values(ModuleSystem))
  .default(DEFAULT_PROGRAM_OPTIONS.moduleSystem);

export const verbose = new Option('-v, --verbose <boolean>', 'Enable verbose logging')
  .default(DEFAULT_PROGRAM_OPTIONS.verbose)
  .argParser((value) => {
    return value === 'true';
  });
