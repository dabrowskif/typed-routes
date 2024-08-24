export type RequiredProgramOptions = {
  rootDirectory: string;
  framework: Framework;
};

export type ProgramOptions = RequiredProgramOptions & {
  outputDirectory: string;
  outputFileName: string;
  verbose: boolean;
  functionName: string;
  moduleSystem: ModuleSystem;
};

export enum Framework {
  SVELTEKIT = "sveltekit",
  // NEXTJS = "nextjs",
}

export enum ModuleSystem {
  ES6 = "es6",
  COMMONJS = "commonjs",
}
