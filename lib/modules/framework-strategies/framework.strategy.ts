import { Arg } from "./arg.strategy";

/**
 * Abstract class representing a strategy for a specific framework.
 * This class defines a contract for methods to be implemented by concrete framework strategies.
 */
export abstract class FrameworkStrategy {
  /**
   * Abstract method to get file metadata for route generation.
   */
  abstract getFileMetadata(
    fileName: string,
    parentArgs: Arg[],
    parentPath: string,
  ): { currentArgs: Arg[]; fullPath: string; functionValue: string };
}

export enum Framework {
  // NEXTJS = "Nextjs",
  SVELTEKIT = "SvelteKit",
}
