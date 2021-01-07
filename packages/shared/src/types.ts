export interface User {
  id: string;
  email: string;
  isAdmin?: boolean;
  isVerified: boolean;
  hasSubscription: boolean;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface SubscriptionResult {
  result: 'ok' | 'already-subscribed';
}

export interface VideoUpload {
  resolution: string;
  url: string;
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
  htmlS3Key: string;
  hintHtmlS3Key: string | null;
  testsInfo: UploadTestsInfo;
  videoSolution: VideoUpload[] | null;
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
  estimatedPracticeTimeHours: number;
  lessons: ModuleLessonUpload[];
  tasks: ModuleTaskUpload[];
}

export interface Module {
  id: string;
  name: string;
  description: string;
  progress: number;
  isPending: boolean;
  totalTasks: number;
  totalLessons: number;
  estimatedPracticeTimeHours: number;
}

export interface ModuleLesson {
  id: number;
  name: string;
  sources: VideoUpload[];
  isWatched: boolean;
}

export interface ModuleTask {
  id: number;
  name: string;
  isExample: boolean;
  isSolved: boolean;
  practiceTime?: number;
  score: number;
}

export interface ModuleDetails {
  id: string;
  name: string;
  description: string;
  lessons: ModuleLesson[];
  tasks: ModuleTask[];
}

export interface ModuleTaskDetails extends ModuleTask {
  moduleId: string;
  detailsUrl: string;
  htmlUrl: string;
  nextTask: ModuleTask | null;
  hasHint: boolean;
  hasVideoSolution: boolean;
  isHintOpened: boolean;
  isSolutionOpened: boolean;
}

export interface TaskTestInfo {
  sourceUrl: string;
  testFiles: TestFileInfo[];
}

export interface TaskSolvedSocketMsg {
  type: 'TaskSolved';
  payload: {
    userId: string;
    moduleId: string;
    taskId: number;
    score: number;
  };
}

export type AppSocketMsg = TaskSolvedSocketMsg;

export interface TaskWaitResult {
  type: 'wait';
  waitTime: number;
  remainingTime: number;
}

export type TaskHintResult =
  | {
      type: 'ok';
      url: string;
    }
  | TaskWaitResult;

export type TaskVideoResult =
  | {
      type: 'ok';
      sources: VideoUpload[];
    }
  | TaskWaitResult;

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  companyName?: string;
  companyVat?: string;
  address: string;
  postalCode: string;
  city: string;
}

export interface SubscriptionStatus {
  hasSubscription: boolean;
  expires: string | null;
}

export interface Order {
  id: string;
  name: string;
  date: string;
  amount: number;
}

export interface NotificationSettings {
  newsletter: boolean;
  newContent: boolean;
  subscriptionRemainder: boolean;
}
