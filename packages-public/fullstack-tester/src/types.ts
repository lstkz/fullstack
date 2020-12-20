export interface TestFileInfo {
  path: string;
  hash: string;
}

export interface TaskTestInfo {
  sourceUrl: string;
  testFiles: TestFileInfo[];
}
