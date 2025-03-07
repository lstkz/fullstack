import { ModuleTaskUpload } from 'shared';

export interface FileUpload {
  name: string;
  path: string;
  content: Buffer;
}

export interface TaskInfo {
  task: ModuleTaskUpload;
  taskDir: string;
  uniqName: string;
  detailsPath: string;
  distFileName: string;
  distFilePath: string;
  sourceTarPath: string;
  htmlFilePath: string;
  hintHtmlFilePath: string | null;
}

export interface TaskUpload {
  id: number;
  name: string;
  detailsS3Key: string;
  sourceS3Key: string;
  htmlS3Key: string;
  hintHtmlS3Key: string | null;
}
