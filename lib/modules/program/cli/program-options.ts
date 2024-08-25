import { CLI } from './cli';

export const PROGRAM_OPTIONS = new CLI().generateProgramOptions(process.argv);
