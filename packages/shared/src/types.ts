export interface User {
  id: string;
  email: string;
  isAdmin?: boolean;
  isVerified: boolean;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface SubscriptionResult {
  result: 'ok' | 'already-subscribed';
}

export interface VideoUpload {
  resolution: number;
  s3Key: string;
}

export interface TPayGroup {
  id: number;
  name: string;
  banks: string;
  img: string;
  main_bank_id: number;
}

export interface PriceDefinition {
  net: number;
  vat: number;
  vatRate: number;
  total: number;
}

export type SubscriptionPlanType = 'monthly' | 'annual';

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: SubscriptionPlanType;
  price: PriceDefinition;
  pricePerMonth: number;
  savings: number;
}

export interface ModuleLessonUpload {
  id: number;
  name: string;
  sources: VideoUpload[];
}

export interface ModuleTaskUpload {
  id: number;
  name: string;
  isExample: boolean;
  detailsS3Key: string;
  sourceS3Key: string;
  testsInfo: UploadTestsInfo;
}

export interface TestFileInfo {
  path: string;
  hash: string;
}

export interface UploadTestsInfo {
  resultHash: string;
  files: TestFileInfo[];
}

export interface ModuleUpload {
  id: string;
  isPending: boolean;
  name: string;
  description: string;
  lessons: ModuleLessonUpload[];
  tasks: ModuleTaskUpload[];
}

export interface Module {
  id: string;
  name: string;
  description: string;
}

export interface ModuleLesson {
  id: number;
  name: string;
}

export interface ModuleTask {
  id: number;
  name: string;
  isExample: boolean;
}

export interface ModuleDetails extends Module {
  lessons: ModuleLesson[];
  tasks: ModuleTask[];
}

export interface ModuleTaskDetails {
  id: number;
  moduleId: string;
  name: string;
  isExample: boolean;
  detailsUrl: string;
}

export interface TaskTestInfo {
  sourceUrl: string;
  testFiles: TestFileInfo[];
}
