export type FileTree = {
  [key: string]: FileTree;
} | null;
