export type ProgramOptions = {
  rootDirectory: string;
  outputDirectory: string;
  outputFileName: string;
  verbose: boolean;
  functionName: string;
  moduleSystem: ModuleSystem;
  framework: Framework;
};

export enum Framework {
  SVELTEKIT = "sveltekit",
  // NEXTJS = "nextjs",
}

export enum ModuleSystem {
  ES6 = "ES6",
  COMMONJS = "COMMONJS",
}
