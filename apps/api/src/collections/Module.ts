import { VideoUpload } from 'shared';
import { createCollection } from '../db';

export interface ModuleLessonModel {
  id: number;
  name: string;
  sources: VideoUpload[];
}

export interface TaskTestsInfo {
  resultHash: string;
  files: Array<{
    path: string;
    hash: string;
  }>;
}

export interface ModuleTaskModel {
  id: number;
  name: string;
  isExample: boolean;
  detailsS3Key: string;
  sourceS3Key: string;
  htmlS3Key: string;
  hintHtmlS3Key: string | null;
  testsInfo: TaskTestsInfo;
  videoSolution: VideoUpload[] | null;
}

export interface ModuleModel {
  _id: string;
  isPending: boolean;
  name: string;
  description: string;
  packageJson: string;
  estimatedPracticeTimeHours: number;
  lessons: ModuleLessonModel[];
  tasks: ModuleTaskModel[];
}

export const ModuleCollection = createCollection<ModuleModel>('module');
